<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

// form status
const dialog = ref(false)
const profileForm = ref(null)

// get userStore
const userStore = useUserStore()
const userData = computed(() => userStore.userData)

const formData = ref({
  username: userData.value.username,
  email: userData.value.email
})

// form rule
const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'E-mail must be valid.'
}

// form function
const saveForm = () => {
  // validate form data
  profileForm.value.validate()
  if (profileForm.value.isValid) {
    dialog.value = false // close dialog
    userStore.setUserData({
      username: computed(() => userData.value.username),
      email: computed(() => userData.value.email)
    })
  } else {
    alert('Form is invalid!')
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        text="Edit Profile"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card prepend-icon="mdi-account" title="User Profile">
      <v-card-text>
        <v-form ref="profileForm">
          <v-text-field
            v-model="formData.username"
            label="Username*"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="formData.email"
            label="Email*"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn color="primary" text="Save" variant="tonal" @click="saveForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
