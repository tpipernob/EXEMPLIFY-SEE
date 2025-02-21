import { db, auth } from './index'
import { collection, addDoc, updateDoc, doc, getDocs, getDoc, deleteDoc, arrayUnion } from 'firebase/firestore'

// 🔹 Criar um novo exemplo no Firestore
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

// 🔹 Atualizar um exemplo (apenas admins ou donos do exemplo)
export const atualizarExemplo = async (exemploId, novosDados) => {
  try {
    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    // 🔹 Apenas admins podem alterar o campo "aprovado"
    if ('aprovado' in novosDados && !user.isAdmin) {
      throw new Error('Apenas administradores podem aprovar exemplos.')
    }

    await updateDoc(exemploRef, {
      ...novosDados,
      lastUpdated: new Date().toISOString() // Atualiza a data sempre que houver alteração
    })
  } catch (error) {
    console.error('Erro ao atualizar exemplo:', error)
    throw error
  }
}

// 🔹 Obter todos os exemplos públicos
export const carregarExemplos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'exemplos'))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erro ao carregar exemplos:', error)
    throw error
  }
}

// 🔹 Adicionar avaliação a um exemplo
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

// 🔹 Excluir um exemplo (somente admin)
export const excluirExemplo = async (exemploId) => {
  try {
    const user = auth.currentUser
    if (!user || !user.isAdmin) throw new Error('Apenas administradores podem excluir exemplos.')

    await deleteDoc(doc(db, 'exemplos', exemploId))
  } catch (error) {
    console.error('Erro ao excluir exemplo:', error)
    throw error
  }
}

export const carregarExemploPorId = async (id) => {
  try {
    const exemploRef = doc(db, 'exemplos', id)
    const exemploSnap = await getDoc(exemploRef)

    if (exemploSnap.exists()) {
      return { id: exemploSnap.id, ...exemploSnap.data() }
    } else {
      console.warn('Exemplo não encontrado:', id)
      return null
    }
  } catch (error) {
    console.error('Erro ao carregar exemplo:', error)
    throw error
  }
}

// 🔹 Adicionar avaliação a um exemplo
export const salvarAvaliacao = async (exemploId, avaliacao) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuário não autenticado.')

    // 🔹 Buscar o nome do usuário no Firestore, caso `displayName` não esteja configurado
    let userName = user.displayName || 'Usuário Anônimo'
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      userName = userSnap.data().name || 'Usuário Anônimo'
    }

    const exemploRef = doc(db, 'exemplos', exemploId)
    const exemploSnap = await getDoc(exemploRef)

    if (!exemploSnap.exists()) throw new Error('Exemplo não encontrado.')

    const novaAvaliacao = {
      author: userName,
      rating: avaliacao.rating,
      comment: avaliacao.comment,
      date: new Date().toISOString(),
      userId: user.uid // 🔹 Vincula a avaliação ao usuário logado
    }

    await updateDoc(exemploRef, {
      ratings: arrayUnion(novaAvaliacao)
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
      avaliacao.userId === user.uid ? avaliacaoAtualizada : avaliacao
    )

    await updateDoc(exemploRef, { ratings: avaliacoesAtualizadas })
    return avaliacaoAtualizada
  } catch (error) {
    console.error('Erro ao editar avaliação:', error)
    throw error
  }
}
