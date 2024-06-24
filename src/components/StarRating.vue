<template>
  <div>
    <i v-for="index in 5" :key="index" class="fa fa-star" :class="rating >= index ? 'fas' : 'far'"
      @mouseover="starOver(index)" @click="setRating(index)"></i>
  </div>
</template>

<script>

import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default {
  props: {
    docIdprop: {
      type: String,
      required: true
    },
    reviewIdprop: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      rating: 0, // initial value
      temp_rating: null,
      docId: this.docIdprop, // replace with your document ID
      reviewId: this.reviewIdprop // replace with your user's unique id
    }
  },
  methods: {
    starOver (index) {
      this.temp_rating = this.rating
      this.rating = index
    },
    async setRating (index) {
      this.temp_rating = index
      await this.addOrUpdateReview(this.docId, this.reviewId, this.reviewId, this.temp_rating)
    },
    async getRatingFromApi () {
      this.rating = await this.getAverageRating(this.docId)
    },
    async getAverageRating (docId) {
      const ratingsRef = collection(db, 'ratings', docId, 'reviews')
      const ratingsSnapshot = await getDocs(ratingsRef)
      let totalRating = 0
      let count = 0
      ratingsSnapshot.forEach(doc => {
        totalRating += doc.data().value
        count++
      })
      return (count === 0) ? 0 : totalRating / count
    },

    async addOrUpdateReview (docId, reviewId, userId, rating) {
      const reviewRef = doc(db, 'ratings', docId, 'reviews', reviewId)
      await setDoc(reviewRef, { userId: userId, value: rating }, { merge: true })
    }
  },
  mounted () {
    this.getRatingFromApi()
  }
}
</script>

<style>
.fa-star {
  cursor: pointer;
  color: gold;
}
</style>
