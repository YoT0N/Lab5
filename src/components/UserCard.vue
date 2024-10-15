<template>
  <div class="user-card-container">
    <div class="toolbar">
      <button
        @click="filterGender('all')"
        :class="{ active: selectedGender === 'all' }"
      >
        All
      </button>
      <button
        @click="filterGender('Male')"
        :class="{ active: selectedGender === 'Male' }"
      >
        Male
      </button>
      <button
        @click="filterGender('Female')"
        :class="{ active: selectedGender === 'Female' }"
      >
        Female
      </button>
    </div>

    <div>
      <div class="container" v-if="filteredUsers.length > 0">
        <div
          v-for="(userData, index) in filteredUsers"
          :key="index"
          :class="['user-card', userData.age >= 18 ? 'adult' : 'child']"
        >
          <img :src="userData.photo" alt="User photo" class="user-photo" />
          <h2 class="position">
            {{ userData.firstName }} {{ userData.lastName }}
          </h2>
          <p class="gender">Gender: {{ userData.gender }}</p>
          <p v-if="userData.age >= 18" class="age">Age: {{ userData.age }}</p>
          <p class="position">Position: {{ userData.position }}</p>
          <h3 class="hobbies-title">Hobbies</h3>
          <ul class="hobbies-list">
            <li
              class="li"
              v-for="(hobby, index) in userData.hobbies"
              :key="index"
            >
              {{ hobby }}
            </li>
          </ul>
        </div>
      </div>
      <p v-else class="container empty">Список юзерів пустий</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { User } from "@/models/User";

export default defineComponent({
  name: "UserCard",
  setup() {
    const userArr = createUsers();
    const users = reactive(userArr);
    const filteredUsers = ref([...users]);
    const selectedGender = ref("all");

    const filterGender = (gender: string) => {
      selectedGender.value = gender;
      if (gender === "all") {
        filteredUsers.value = users;
      } else {
        filteredUsers.value = users.filter((user) => user.gender === gender);
      }
    };

    return {
      filteredUsers,
      filterGender,
      selectedGender,
    };
  },
});

function createUsers(): User[] {
  const users: User[] = [
    new User("John", "Doe", "Male", 30, "Developer", [
      "Coding",
      "Gaming",
      "Reading",
    ]),
    new User("Jane", "Smith", "Female", 25, "Designer", [
      "Art",
      "Travel",
      "Cooking",
    ]),
  ];

  for (let i = 0; i < 18; i++) {
    const user = new User(
      `FirstName${i}`,
      `LastName${i}`,
      i % 2 === 0 ? "Male" : "Female",
      15 + i,
      `Position${i}`,
      ["Reading", "Gaming", "Sports"]
    );
    users.push(user);
  }

  return users;
}
</script>
<style scoped>
.user-card-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.container {
  width: 900px;
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
}

.toolbar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.toolbar button {
  padding: 10px 20px;
  background: #5c5b5b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.user-card {
  border: 4px solid transparent;
  padding: 20px;
  width: 200px;
  margin: 10px;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.adult {
  border-color: #22ff00;
}

.child {
  border-color: #ff0000;
}

.user-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 3px solid #808080;
}

.gender,
.age,
.position {
  margin: 5px 0;
  color: #555;
  font-size: 16px;
}

.empty {
  margin: 20px;
  text-align: center;
  font-size: 18px;
  color: #555;
}
.hobbies-title,
.li {
  color: #555;
}
</style>
