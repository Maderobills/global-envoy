// stores/statusUpdateStore.js
import { defineStore } from 'pinia'
import { 
  getDatabase, 
  ref as dbRef, 
  push, 
  set, 
  get,
  query,
  orderByChild
} from 'firebase/database'

export const useStatusUpdateStore = defineStore('statusUpdate', {
  state: () => ({
    trackingUpdates: {},
    loading: false,
    error: null
  }),

  actions: {
    /**
     * Creates a new status update for a shipment
     * @param {string} userId - The user ID
     * @param {string} trackingNum - The tracking number
     * @param {Object} statusData - The status update data
     */
    async createStatusUpdate(userId, trackingNum, statusData) {
      this.loading = true
      this.error = null
      
      try {
        const db = getDatabase()
        const updatePath = `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`
        const trackingRef = dbRef(db, updatePath)
        
        const newUpdate = {
          transitType: statusData.transitType,
          location: statusData.location || '',
          date: statusData.date || '',
          note: statusData.note || '',
          status: statusData.status || '',
          timestamp: new Date().toISOString()
        }

        // Add to existing updates array or create new one
        await push(trackingRef, newUpdate)

        // Update local state
        if (!this.trackingUpdates[trackingNum]) {
          this.trackingUpdates[trackingNum] = []
        }
        this.trackingUpdates[trackingNum].push(newUpdate)

      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetches all status updates for a tracking number
     * @param {string} userId - The user ID
     * @param {string} trackingNum - The tracking number
     */
    async fetchStatusUpdates(userId, trackingNum) {
      this.loading = true
      this.error = null

      try {
        const db = getDatabase()
        const updatePath = `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}`
        const trackingRef = dbRef(db, updatePath)
        
        const snapshot = await get(query(trackingRef, orderByChild('timestamp')))
        
        if (snapshot.exists()) {
          const updates = []
          snapshot.forEach((childSnapshot) => {
            updates.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            })
          })
          this.trackingUpdates[trackingNum] = updates
        } else {
          this.trackingUpdates[trackingNum] = []
        }

        return this.trackingUpdates[trackingNum]

      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Updates an existing status update
     * @param {string} userId - The user ID
     * @param {string} trackingNum - The tracking number
     * @param {string} updateId - The update ID to modify
     * @param {Object} statusData - The new status data
     */
    async updateStatus(userId, trackingNum, updateId, statusData) {
      this.loading = true
      this.error = null

      try {
        const db = getDatabase()
        const updatePath = `/Users/${userId}/Shipments/${trackingNum}/Tracking/${trackingNum}/${updateId}`
        const updateRef = dbRef(db, updatePath)

        const updatedData = {
          transitType: statusData.transitType,
          location: statusData.location || '',
          date: statusData.date || '',
          note: statusData.note || '',
          status: statusData.status || '',
          timestamp: new Date().toISOString()
        }

        await set(updateRef, updatedData)

        // Update local state
        const updateIndex = this.trackingUpdates[trackingNum]?.findIndex(
          update => update.id === updateId
        )
        
        if (updateIndex !== -1) {
          this.trackingUpdates[trackingNum][updateIndex] = {
            id: updateId,
            ...updatedData
          }
        }

      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    /**
     * Get all updates for a specific tracking number
     */
    getUpdatesByTracking: (state) => (trackingNum) => {
      return state.trackingUpdates[trackingNum] || []
    },

    /**
     * Get the latest status update for a tracking number
     */
    getLatestUpdate: (state) => (trackingNum) => {
      const updates = state.trackingUpdates[trackingNum] || []
      return updates.length ? updates[updates.length - 1] : null
    },

    /**
     * Get loading state
     */
    isLoading: (state) => state.loading,

    /**
     * Get error state
     */
    getError: (state) => state.error
  }
})