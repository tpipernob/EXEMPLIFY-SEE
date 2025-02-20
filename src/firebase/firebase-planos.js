import { db, auth } from './index.js'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
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

// Buscar todos os planos públicos e incluir o nome do autor
export const carregarPlanosPublicos = async () => {
  try {
    const planosCollection = collection(db, 'planosDeEnsino')
    const q = query(planosCollection, where('publico', '==', true))
    const querySnapshot = await getDocs(q)

    const planos = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const plano = docSnap.data()
        const userId = plano.userId || null

        let autorNome = 'Desconhecido'

        if (userId) {
          const userRef = doc(db, 'users', userId)
          const userDoc = await getDoc(userRef)

          if (userDoc.exists()) {
            autorNome = userDoc.data().name || 'Usuário'
          }
        }

        return {
          id: docSnap.id,
          ...plano,
          autor: autorNome
        }
      })
    )

    return planos
  } catch (error) {
    console.error('Erro ao carregar planos públicos:', error)
    throw new Error('Erro ao carregar planos públicos.')
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
