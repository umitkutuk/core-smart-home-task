<template>
  <ul class="todo-list">
    <li class="todo" v-for="accessory in accessories" :key="accessory._id" :class="{status: accessory.status, editing: accessory._id == (editedAccessory && editedAccessory._id)}">
      <div class="view">
        <input class="toggle" type="checkbox" :checked="accessory.status" @change="setStatus(accessory, $event.target.checked)">
        <label @dblclick="editAccessory(accessory)">{{accessory.title}}</label>
        <button class="destroy" @click="removeAccessory(accessory)"></button>
      
      </div>
      <input class="edit" type="text" :value="accessory.title" v-accessory-focus="accessory._id == (editedAccessory && editedAccessory._id)" @blur="doneEdit(accessory, $event.target.value)" @keyup.enter="doneEdit(accessory, $event.target.value)" @keyup.esc="cancelEdit(accessory)">
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['accessories'],

    data() {
      return {
        editedAccessory: null,
      };
    },

    methods: {
      removeAccessory(accessory) {
        // TODO: Handle errors.
        Methods.Accessories.Remove.call({accessoryId: accessory._id});
      },

      editAccessory(accessory) {
        this.beforeEditCache = accessory.title;
        this.editedAccessory = accessory;
      },

      doneEdit(accessory, title) {
        if (!this.editedAccessory) {
          return;
        }
        this.editedAccessory = null;
        title = title.trim();
        if (!title) {
          this.removeAccessory(accessory);
        }
        else {
          // TODO: Handle errors.
          Methods.Accessories.SetTitle.call({accessoryId: accessory._id, title});
        }
      },

      cancelEdit(accessory) {
        this.editedAccessory = null;
        accessory.title = this.beforeEditCache;
      },

      setStatus(accessory, status) {
        // TODO: Handle errors.
        Methods.Accessories.SetStatus.call({accessoryId: accessory._id, status});
      },
    },

    // A custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    directives: {
      'accessory-focus'(el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
  }
</script>