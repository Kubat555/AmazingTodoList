<template>
  <div>
    <section v-if="openCreateForm" class="create-todo" @click="openForm(false)">
      <div class="todo-form" @click.stop>
        <h3>Create a todo</h3>
        <form @submit.prevent="addTodo">
          <p style="margin-bottom: 10px">Todo title</p>
          <input
              style="margin-bottom: 25px"
              v-model="input_content"
              required
              maxlength="30"
              type="text" placeholder="type your todo...">
          <p style="margin-bottom: 10px">Date</p>
          <input
              style="margin-bottom: 25px"
              v-model="input_deadline"
              type="date" placeholder="type your deadline date...">

          <h4 style="margin-bottom: 20px; text-align: center;">Pick a category</h4>
          <div class="options">
            <label class="options-item low-checkbox">
              <input type="radio" name="category" id="category-low" value="low" v-model="input_category">
              <span >low</span>
            </label>
            <label class="options-item medium-checkbox">
              <input type="radio" name="category" id="category-medium" value="medium" v-model="input_category">
              <span >medium</span>
            </label>
            <label class="options-item high-checkbox">
              <input type="radio" name="category" id="category-high" value="high" v-model="input_category">
              <span >high</span>
            </label>
          </div>
          <button class="todo-form-btn btn" >
            Add todo
          </button>
        </form>
      </div>
    </section>

    <section class="todo-list">
      <h3>Todo list</h3>
      <nav class="todo-list-navs">
        <ul class="todo-list-filters">
          <li :class="{'active' : currentFilter === ''}"><span @click="filterTodos('')">All</span></li>
          <li style="font-weight: bold">|</li>
          <li :class="{'active' : currentFilter === 'low'}"><span @click="filterTodos('low')">Low</span></li>
          <li :class="{'active' : currentFilter === 'medium'}"><span @click="filterTodos('medium')">Medium</span></li>
          <li :class="{'active' : currentFilter === 'high'}"><span @click="filterTodos('high')">High</span></li>
        </ul>
        <div style="display: flex; align-items: center">
          <input class="todo-list-search" type="text" v-model="searchQuery" placeholder="Search..." />
          <button @click="openForm(true)" class="todo-list-add btn">Add todo</button>
        </div>

      </nav>


      <div v-if="todos.length > 0" class="todo-items">
        <div v-for="todo in todos_asc" class="todo-item">
          <TransitionGroup name="list">
            <label>
            <span class="todo-item-title">
              <input
                  type="text"
                  v-model="todo.content"
                  maxlength="30"
                  :class="{'bubble': todo.done}"
              />
              <input type="checkbox" v-model="todo.done">
            </span>

            <span class="todo-item-desc">
              <input type="date" v-model="todo.deadline" class="todo-item-deadline "  :class="{'activeDate': new Date(todo.deadline).getTime() >= Date.now()}" />
              <select :class="`todo-item-category ${todo.category}`" v-model="todo.category">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </span>

              <button class="todo-item-remove btn" @click="removeTodo(todo)">Remove</button>
            </label>
          </TransitionGroup>
        </div>
      </div>

      <div style="margin-top: 40px; font-size: 20px" v-else>Todo list is empty! :)))</div>

    </section>
  </div>
</template>


<script setup>
import emailjs from 'emailjs-com';
import {ref, onMounted,computed,watch} from "vue";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {db} from "@/Firebase";

let firebaseCollection = collection(db, "todos");
const openCreateForm = ref(false);
const todos = ref([]);
const name = ref('');

const input_content = ref('');
const input_category = ref(null);
const input_deadline = ref(null);
const searchQuery = ref('');
let currentFilter = ref('');

const todos_filter = computed(()=>{
  return todos.value.filter((todo)=> todo.category.includes(currentFilter.value))
})

const todos_asc = computed(()=>{
  return todos.value.sort((a,b)=>{
    return b.createdAt - a.createdAt;
  }).filter((todo)=> todo.category.includes(currentFilter.value))
      .filter(((todo)=> todo.content.toLowerCase().includes(searchQuery.value.toLowerCase())))
})

const filterTodos = (value)=>{
  currentFilter.value = value;
  console.log(currentFilter);
}

const addTodo = ()=>{
  console.log("SSS")
  if(input_content.value.trim() === '' || input_category.value === null){
    return;
  }

  addDoc(firebaseCollection, {
    category: input_category.value,
    content: input_content.value,
    createdAt: Date.now(),
    deadline: input_deadline.value,
    done: false,
  });

  input_content.value = ''
  input_category.value = null
  input_deadline.value = null;
}

const removeTodo = (todo)=>{
  deleteDoc(doc(firebaseCollection, todo.id));
}

const openForm = (ss)=>{
  openCreateForm.value = ss;
}

const sendEmail = (todoTex, todoDeadline)=> {
  try {
    emailjs.send("service_hk9nc7k","template_fv11196",
        {
          todo: todoTex,
          deadline: todoDeadline
        }, 'gteryR8-civrTK-SD',)

  } catch(error) {
    console.log({error})
  }
}

watch(todos, newVal=>{
  newVal.forEach(todo =>{
    const washingtonRef = doc(firebaseCollection, todo.id);

    updateDoc(washingtonRef, {
      category: todo.category,
      content: todo.content,
      createdAt: todo.createdAt,
      deadline: todo.deadline,
      done: todo.done,
    });

    if(new Date(todo.deadline).getTime() <= Date.now()){
      sendEmail(todo.content, todo.deadline);
    }
  })

}, {deep:true})

watch(name, (newVal)=>{
  localStorage.setItem('name', newVal)
})

onMounted( () => {
  name.value = localStorage.getItem('name') || '';
  // todos.value = JSON.parse(localStorage.getItem('todos')) || [];


  onSnapshot(firebaseCollection, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        category: doc.data().category,
        done: doc.data().done,
        createdAt: doc.data().createdAt,
        deadline: doc.data().deadline
      }
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });

})
</script>

<style >
h3 {
  color: #353e4d;
  font-size: 32px;
  margin-bottom: 1rem;
}

h4 {
  color: #424242;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}


.create-todo{
  position: fixed;
  background-color: rgba(42, 33, 33, 0.5);;
  width: 100%;
  height: 100%;
}
.create-todo input[type="text"] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: #e5f8fd;
  background-color: #518099;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}
.create-todo input[type="text"]::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #b5e0e8;
}

.create-todo input[type="date"]{
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.todo-form{
  position: fixed; top: 50%; left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: #ebf3fa;
  height: 550px;
  width: 600px;
  padding: 40px 80px;
}

.todo-form h3{
  text-align: center;
  margin-bottom: 40px;
}

.options{
  display: flex;
  justify-content: space-evenly;
}

.options-item{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  background-color: #b1cedd;
}
.options-item span{
  margin-left: 10px;
  font-size: 18px;
}

.todo-form-btn{
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 60px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  font-weight: 100;
}

/*-----------------------------------------------------------*/

.todo-list-search{
  width: 300px;
  height: 38px;
  font-size: 14px;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-right: 50px;
  color: #e5f8fd;
  background-color: rgba(81, 128, 153, 0.69);
  transition: 0.4s;
}
.todo-list-search:focus{
  background-color: rgba(81, 128, 153, 1);
}

.todo-list-search::-webkit-input-placeholder{
  color: #b5e0e8;
}

.todo-list{
  padding: 20px 40px;
}

.todo-list-navs{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-list-filters{
  display: flex;

}
.todo-list-filters .active{
  color: #ff844b;
}

.todo-list-filters li{
  position: relative;
  margin-right: 25px;
  cursor: pointer;
  font-size: 18px;
}

.todo-list-filters li span:after{
  content: '';
  width: 100%;
  position: absolute;
  height: 3px;
  border-radius: 5px;
  background: #ff844b;
  bottom: -5px;
  left: 0;
  transform-origin: left;
  transition: transform .5s ease;
  transform: scaleX(0);
}
.todo-list-filters li span:hover{
  color: #ff844b;
}

.todo-list-filters li span:hover:after{
  transform: scaleX(1);
}

.todo-items{
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}

.todo-item{
  margin-right: 30px;
  margin-bottom: 30px;
}


.todo-item label{
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
}
.todo-item-title{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

}
.bubble {
  text-decoration: line-through;
}

.todo-item-title input[type="text"]{
  width: 100%;
  margin-right: 10px;
  font-size: 18px;
}

.todo-item-desc{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.todo-item-deadline{
  padding: 5px 10px;
  background-color: #ffc5dc;
  border-radius: 5px;
  border: 1px solid #e51954;
}

.activeDate{
  background-color: #b5e0e8;
  border: none;
}



.todo-item-category{
  margin-left: 20px;
  width: 100px;
  padding: 6px 10px;
  background-color: #e5f8fd;
  border-radius: 7px;
  font-size: 15px;
  text-align: center;
}

.low{
  background-color: #bbda9e;
  color: #03832c;
}
.medium{
  background-color: #ffe2b5;
  color: #ff9700;
}
.high{
  background-color: #ffb5c3;
  color: #d5195a;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>