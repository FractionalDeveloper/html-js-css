<template>
  <h1>ToDo App</h1>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" placeholder="Neue Aufgabe" />
    <button type="submit">Hinzufügen</button>
  </form>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span :class="{ done: todo.done }" @click="toggleDone(todo)">
        {{ todo.content }}
      </span>
      <button :id="remove" @click="removeTodo(index)">Entfernen</button>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([
  { done: false, content: 'Blogpost schreiben' },
  { done: false, content: 'Podcast hören' }
])

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({ done: false, content: newTodo.value })
    newTodo.value = ''
  }
}

function toggleDone(todo) {
  todo.done = !todo.done
}

function removeTodo(index) {
  todos.value.splice(index, 1)
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: #aaa;
}
remove {
    color: red;
    cursor: pointer;
    margin-right: 25px;
}
</style>