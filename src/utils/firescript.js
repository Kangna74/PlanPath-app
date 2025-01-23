import { getCurrentUser } from 'vuefire'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
  query,
  getDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

const plansCollection = collection(db, 'plans')

async function getUser() {
  return getCurrentUser()
}

export async function getAllPlans() {
  const querySnapshot = await getDocs(query(plansCollection, where('public', '==', true)))

  return docsToArray(querySnapshot)
}

export async function getPlansByActualUser() {
  const user = await getUser()

  const querySnapshot = await getDocs(query(plansCollection, where('userId', '==', user.uid)))

  return docsToArray(querySnapshot)
}

export async function getPlanById(id) {
  const docRef = doc(plansCollection, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    }
  } else {
    return null
  }
}

function docsToArray(querySnapshot) {
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })
}

export async function postPlan(plan) {
  const newPlan = {
    userId: (await getUser()).uid,
    ...plan,
  }
  return await addDoc(plansCollection, newPlan)
}

export async function deletePlan(id) {
  return await deleteDoc(doc(plansCollection, id))
}

export async function updatePlan(plan) {
  const planRef = doc(db, 'plans', plan.id)
  return updateDoc(planRef, plan)
}
