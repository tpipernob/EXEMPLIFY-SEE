import { db, auth } from './index'
import { collection, addDoc, updateDoc, doc, getDocs, getDoc, deleteDoc } from 'firebase/firestore'

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
