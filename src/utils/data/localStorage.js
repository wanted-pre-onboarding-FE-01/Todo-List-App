import moment from 'moment'

const MAIN_STORAGE_KEY = 'todo'

export const getAllData = () => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData)
}

export const updateAllData = (allData) => {
  try {
    localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(allData))
  } catch (err) {
    console.log(err)
  }
}

export const getUserByNickName = (nickName) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter((val) => val.userNickName === nickName)[0]
}
export const getUserByUserId = (userId) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter((val) => val.id === userId)[0]
}

export const getCategoryByNickNameAndCategoryId = (nickName, categoryId) => {
  const user = getUserByNickName(nickName)
  return user.data.category.filter((val) => val.id === categoryId)[0]
}

export const getPastTodosByNickName = (nickName) => {
  const userData = getUserByNickName(nickName)
  const today = moment().format('YYYY/MM/DD')
  return userData.data.todoList.filter((todo) => moment(todo.date).isBefore(today) && !todo.isDone)
}

export const updatePastTodos = (nickName, pastTodos, deleteTodos) => {
  const userData = getUserByNickName(nickName)
  pastTodos.forEach((pastTodo) => {
    const index = userData.data.todoList.findIndex((todo) => todo.id === pastTodo.id)
    userData.data.todoList.splice(index, 1)
  })
  deleteTodos.forEach((deleteTodo) => {
    const index = pastTodos.findIndex((pastTodo) => pastTodo.id === deleteTodo.id)
    pastTodos.splice(index, 1)
  })
  pastTodos.forEach((pastTodo) => {
    pastTodo.date = moment().format('YYYY/MM/DD')
  })
  userData.data.todoList.push(...pastTodos)
  const allData = getAllData()
  allData.forEach((user) => {
    if (user.userNickName === nickName) {
      user.data.todoList = userData.data.todoList
    }
  })
  updateAllData(allData)
}

export const editCategory = (nickName, category) => {
  const allData = getAllData()
  const userData = getUserByNickName(nickName)
  userData.data.category.forEach((value) => {
    if (value.id === category.id) {
      value.categoryName = category.newCategoryName
      value.color = category.newColor
    }
  })
  allData.forEach((user) => {
    if (user.userNickName === nickName) {
      user.data = userData.data
    }
  })
  updateAllData(allData)
}

export const removeCategory = (nickName, categoryId) => {
  const allData = getAllData()
  const userData = getUserByNickName(nickName)
  // remove category
  const categoryIndex = userData.data.category.findIndex((value) => value.id === categoryId)
  userData.data.category.splice(categoryIndex, 1)
  allData.forEach((user) => {
    if (user.userNickName === nickName) {
      user.data = userData.data
    }
  })
  // remove todos
  const willDeleteTodoList = userData.data.todoList.filter((todo) => todo.categoryId === categoryId)
  willDeleteTodoList.forEach((willDeleteTodo) => {
    const willDeleteTodoIndex = userData.data.todoList.findIndex((todo) => todo.id === willDeleteTodo.id)
    userData.data.todoList.splice(willDeleteTodoIndex, 1)
  })
  updateAllData(allData)
}

export const getTodayTodosByNickName = (nickName) => {
  const user = getUserByNickName(nickName)
  const today = moment().format('YYYY/MM/DD')
  return user.data.todoList.filter((todo) => todo.date === today)
}

export const getTodayTodosByUserId = (userId) => {
  const user = getUserByUserId(userId)
  const today = moment().format('YYYY/MM/DD')
  return user.data.todoList.filter((todo) => todo.date === today)
}

export const deleteTodo = (nickName, willBeDeletedTodo) => {
  const userData = getUserByNickName(nickName)
  const filteredCategory =
    userData.data.todoList.filter((userTodo) => userTodo.categoryId === willBeDeletedTodo.categoryId).length === 1
      ? userData.data.category.filter((userCategory) => userCategory.id !== willBeDeletedTodo.categoryId)
      : userData.data.category
  const filteredTodoList = userData.data.todoList.filter((userTodo) => userTodo.id !== willBeDeletedTodo.id)
  const allData = getAllData()
  const filteredData = allData.map((user) => {
    if (userData.userNickName === nickName) {
      return { ...user, data: { category: [...filteredCategory], todoList: [...filteredTodoList] } }
    }
    return user
  })
  updateAllData(filteredData)
}

export const updateTodosByUserId = (userId, todoList) => {
  const allData = getAllData()
  const user = getUserByUserId(userId)
  todoList.forEach((todo) => {
    user.data.todoList.forEach((userTodo) => {
      if (todo.id === userTodo.id) {
        userTodo.isDone = todo.isDone
      }
    })
  })
  allData.forEach((val) => {
    if (val.id === userId) {
      val.data = user.data
    }
  })
  updateAllData(allData)
}

export const getIsLoginedUserByUserId = (userId) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter((val) => val.id === userId && val.isLogined)[0]
}

export const addTodo = (nickName, willBeAddedTodo, willBeAddedCategory) => {
  // 1. 닉네임으로 유저 데이터 가져오기
  const userData = getUserByNickName(nickName)
  const userTodoList = userData.data.todoList
  const userCategoryList = userData.data.category

  // 2. 기존의 데이터에 해당 데이터 추가하기
  // - id 난수로 만들어주고, willBeAddedTodo 이용해서 데이터 추가하기
  userTodoList.push(willBeAddedTodo)
  // - 카테고리는 기존에 없던 종류의 카테고리면 willBeAddedCategory 추가해주기
  const categoryIdList = userCategoryList.map((category) => category.id)
  if (!categoryIdList.includes(willBeAddedCategory.id)) {
    userCategoryList.push(willBeAddedCategory)
  }

  // 3. localStorage 갱신하기
  const allData = getAllData()
  const filteredData = allData.map((user) => {
    if (user.userNickName === nickName) {
      return { ...user, data: { category: [...userCategoryList], todoList: [...userTodoList] } }
    }
    return user
  })
  updateAllData(filteredData)
}

export const updateTodo = (nickName, beforeUpdateTodo, willBeUpdatedTodo, willBeUpdatedCategory) => {
  console.log(nickName, beforeUpdateTodo, willBeUpdatedTodo, willBeUpdatedCategory)
  // 1. 닉네임으로 유저 데이터 가져오기
  const userData = getUserByNickName(nickName)
  const userTodoList = userData.data.todoList
  const userCategoryList = userData.data.category

  // 2. 기존의 데이터를 찾기
  const index = userTodoList.findIndex((userTodo) => userTodo.id === beforeUpdateTodo.id)

  console.log(index)

  // 3. 데이터 업데이트하기
  // 3.1 category 사라지면 제거해주기
  const deletedCategory =
    userTodoList.filter((userTodo) => userTodo.categoryId === beforeUpdateTodo.categoryId).length === 1
      ? userCategoryList.filter((userCategory) => userCategory.id !== beforeUpdateTodo.categoryId)
      : userCategoryList
  console.log(deletedCategory)

  // 3.2 category 추가된 거 있으면 반영해주기
  const categoryIdList = deletedCategory.map((category) => category.id)
  const AddedCategory = categoryIdList.includes(willBeUpdatedCategory.id)
    ? deletedCategory.push(willBeUpdatedCategory)
    : deletedCategory
  console.log(AddedCategory)

  // 3.3 찾은 데이터 자리에 수정할 데이터로 업데이트하기
  userTodoList[index] = {
    ...userTodoList[index],
    todo: willBeUpdatedTodo.todo,
    date: willBeUpdatedTodo.date,
    categoryId: willBeUpdatedTodo.categoryId,
  }

  console.log(userTodoList)

  // 4. localStorage 갱신하기
  const allData = getAllData()
  const filteredData = allData.map((user) => {
    if (user.userNickName === nickName) {
      return { ...user, data: { category: [...AddedCategory], todoList: [...userTodoList] } }
    }
    return user
  })
  console.log(filteredData)
  console.log(allData)
  updateAllData(filteredData)
}