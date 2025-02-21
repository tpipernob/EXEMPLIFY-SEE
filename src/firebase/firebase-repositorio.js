import { db, auth } from './index'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, arrayUnion } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid' // Gera UUIDs únicos

export const adicionarExemplo = async (dadosExemplo) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    const novoExemplo = {
      ...dadosExemplo,
      userId: user.uid, // ID do usuário que cadastrou
      lastUpdated: new Date().toISOString(), // Última atualização
      ratings: [], // Array de avaliações vazias inicialmente
      aprovado: false // 🔹 Exemplo começa não aprovado
    }

    const docRef = await addDoc(collection(db, 'exemplos'), novoExemplo)
    return docRef.id
  } catch (error) {
    console.error('Erro ao adicionar exemplo:', error)
    throw error
  }
}

// Atualizar um exemplo (apenas admins ou donos do exemplo)
export const atualizarExemplo = async (exemploId, novosDados) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const exemplo = exemploSnap.data()

    // 🔹 Busca a role do usuário no Firestore
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userRole = userSnap.exists() ? userSnap.data().role : 'user'

    // 🔹 Verifica se o usuário pode editar o exemplo
    if (userRole !== 'admin' && user.uid !== exemplo.userId) {
      throw new Error('Você não tem permissão para editar este exemplo.')
    }

    // 🔹 Usuários comuns não podem modificar os campos "aprovado" e "link"
    if (userRole !== 'admin') {
      delete novosDados.aprovado
      delete novosDados.link
    }

    // 🔹 Todos podem editar "tipo" e "modelo"
    const dadosAtualizados = {
      ...novosDados,
      lastUpdated: new Date().toISOString() // Atualiza a data de modificação
    }

    // 🔹 Atualiza o Firestore
    await updateDoc(exemploRef, dadosAtualizados)
  } catch (error) {
    console.error('Erro ao atualizar exemplo:', error)
    throw error
  }
}

export const excluirExemplo = async (exemploId) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const exemplo = exemploSnap.data()

    // 🔹 Verifica se o usuário tem permissão para excluir
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userRole = userSnap.exists() ? userSnap.data().role : 'user'

    if (userRole !== 'admin' && user.uid !== exemplo.userId) {
      throw new Error('Você não tem permissão para excluir este exemplo.')
    }

    await deleteDoc(exemploRef)
    return true
  } catch (error) {
    console.error('Erro ao excluir exemplo:', error)
    throw error
  }
}

export const carregarExemplos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'exemplos'))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erro ao carregar exemplos:', error)
    throw error
  }
}

export const adicionarAvaliacao = async (exemploId, avaliacao) => {
  try {
    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const exemplo = exemploSnap.data()
    const novasAvaliacoes = [...exemplo.ratings, avaliacao]

    await updateDoc(exemploRef, { ratings: novasAvaliacoes })
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error)
    throw error
  }
}

export const carregarExemploPorId = async (id) => {
  try {
    const exemploRef = doc(db, 'exemplos', id)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) {
      console.warn('Exemplo não encontrado:', id)
      return null
    }

    const exemplo = { id: exemploSnap.id, ...exemploSnap.data() }

    // 🔹 Buscar nome do usuário que cadastrou o exemplo
    if (exemplo.userId) {
      try {
        const userRef = doc(db, 'users', exemplo.userId)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          exemplo.userName = userSnap.data().name || 'Usuário desconhecido'
        } else {
          exemplo.userName = 'Usuário não encontrado'
        }
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error)
        exemplo.userName = 'Erro ao carregar nome'
      }
    } else {
      exemplo.userName = 'Usuário desconhecido'
    }

    return exemplo
  } catch (error) {
    console.error('Erro ao carregar exemplo:', error)
    throw error
  }
}

export const salvarAvaliacao = async (exemploId, avaliacao) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    // Gera um ID único para a avaliação
    const avaliacaoId = uuidv4()

    const novaAvaliacao = {
      id: avaliacaoId, // Adiciona um ID único
      author: user.displayName || 'Usuário Anônimo',
      rating: avaliacao.rating,
      comment: avaliacao.comment,
      date: new Date().toISOString(),
      userId: user.uid
    }

    const exemploRef = doc(db, 'exemplos', exemploId)
    await updateDoc(exemploRef, {
      ratings: arrayUnion(novaAvaliacao) // Adiciona a avaliação sem sobrescrever as existentes
    })

    return novaAvaliacao
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error)
    throw error
  }
}

export const editarAvaliacao = async (exemploId, avaliacaoAtualizada) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const exemplo = exemploSnap.data()
    const avaliacoesAtualizadas = exemplo.ratings.map(avaliacao =>
      avaliacao.id === avaliacaoAtualizada.id ? avaliacaoAtualizada : avaliacao
    )

    await updateDoc(exemploRef, { ratings: avaliacoesAtualizadas })
    return avaliacaoAtualizada
  } catch (error) {
    console.error('Erro ao editar avaliação:', error)
    throw error
  }
}

export const removerAvaliacao = async (exemploId, avaliacaoId) => {
  try {
    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const exemplo = exemploSnap.data()
    const novasAvaliacoes = exemplo.ratings.filter(avaliacao => avaliacao.id !== avaliacaoId)

    await updateDoc(exemploRef, { ratings: novasAvaliacoes })
    return novasAvaliacoes
  } catch (error) {
    console.error('Erro ao remover avaliação:', error)
    throw error
  }
}
