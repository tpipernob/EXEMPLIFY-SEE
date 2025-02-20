import { db, auth } from './index.js'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { LocalStorage } from 'quasar'

// Referência à coleção no Firestore
const planosCollection = collection(db, 'planosDeEnsino')

// Função para obter usuário autenticado
const getUser = () => auth.currentUser

// Salvar um novo plano
export const salvarPlano = async (plano) => {
  const user = getUser()
  if (!user) throw new Error('Usuário não autenticado.')

  const planoRef = doc(planosCollection, `${user.uid}_${Date.now()}`)
  await setDoc(planoRef, { ...plano, userId: user.uid })

  return planoRef.id
}

// Carregar os planos do usuário logado
export const carregarPlanos = async () => {
  const user = getUser()
  if (!user) throw new Error('Usuário não autenticado.')

  const snapshot = await getDocs(planosCollection)
  return snapshot.docs
    .filter(doc => doc.data().userId === user.uid)
    .map(doc => ({ id: doc.id, ...doc.data() }))
}

// Editar um plano existente
export const editarPlano = async (id, dadosAtualizados) => {
  const user = getUser()
  if (!user) throw new Error('Usuário não autenticado.')

  const planoRef = doc(planosCollection, id)
  await updateDoc(planoRef, dadosAtualizados)
}

// Excluir um plano
export const excluirPlano = async (id) => {
  const user = getUser()
  if (!user) throw new Error('Usuário não autenticado.')

  const planoRef = doc(planosCollection, id)
  await deleteDoc(planoRef)
}

// Contar o número total de planos públicos para paginação
export const contarTotalPlanosPublicos = async () => {
  try {
    const q = query(planosCollection, where('publico', '==', true))
    const querySnapshot = await getDocs(q)
    return querySnapshot.size // Retorna o total de documentos
  } catch (error) {
    console.error('Erro ao contar planos públicos:', error)
    throw error
  }
}

// Buscar planos públicos com paginação
export const carregarPlanosPublicos = async (ultimoDoc = null, pageSize = 6) => {
  try {
    let q = query(
      planosCollection,
      where('publico', '==', true),
      orderBy('nome'),
      limit(pageSize)
    )

    if (ultimoDoc) {
      q = query(q, startAfter(ultimoDoc))
    }

    const querySnapshot = await getDocs(q)

    const planos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return {
      planos,
      ultimoDoc: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null
    }
  } catch (error) {
    console.error('Erro ao carregar planos públicos:', error)
    throw error
  }
}

// Função para carregar um plano salvo (público ou do usuário)
export const carregarPlano = async (planoId) => {
  try {
    const planoRef = doc(db, 'planosDeEnsino', planoId)
    const planoSnap = await getDoc(planoRef)

    if (!planoSnap.exists()) {
      console.error('Plano não encontrado:', planoId)
      throw new Error('Plano não encontrado.')
    }

    const planoSelecionado = { id: planoSnap.id, ...planoSnap.data() }

    console.log('Plano encontrado:', planoSelecionado)

    // Salvar os dados no LocalStorage para serem carregados em TutorialPage
    LocalStorage.set('aulaTeorica', planoSelecionado.dados)
    LocalStorage.set('planoCarregado', planoSelecionado.nome)

    return planoSelecionado
  } catch (error) {
    console.error('Erro ao carregar plano:', error)
    throw error
  }
}
