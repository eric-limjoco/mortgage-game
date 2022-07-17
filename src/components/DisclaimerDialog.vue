<template>
  <div>
    <b-modal
      id="modal-disclaimer"
      ref="modal-disclaimer"
      v-model="show"
      ok-variant="primary"
      ok-title="Agree"
      cancel-title="Exit"
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
      title="Welcome"
      @hidden="handleOk"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
        <p>The AD&amp;Co Mortgage Game is provided for your amusement only. No advice is provided, and none should be inferred, by your participation in the AD&amp;Co Mortgage Game.</p>
        <small>&copy; 2022 Andrew Davidson &amp; Co., Inc. All rights reserved.</small>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDialog () {
      this.show = true
    },
    hideDialog () {
      this.show = false
    },
    handleOk () {
      this.hideDialog()
      this.$tours['myTour'].start()
    },
    handleCancel () {
      window.location.href = 'https://www.ad-co.com/'
    }
  }
}
</script>
