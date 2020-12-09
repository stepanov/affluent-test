const fetch = require('node-fetch')
const Promise = require('bluebird')
const knex = require('./knex')
const { parseTwoDigitYear } = require('moment')

require('dotenv').config()

const endPoint = process.env.REQRES_ENDPOINT

const normalizeData = (data) => {
  const today = new Date().toISOString()

  return data.map((user) => ({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    external_id: user.id,
    created_at: today,
    updated_at: today,
  }))
} 

const saveUsers = async (users) => {
  return await knex('users')
    .insert(users)
} 

const fetchUsers = async (endPoint, page) => {
  const response = await fetch(`${endPoint}?page=${page}`)
  const users = await response.json()
  const result = await saveUsers(normalizeData(users.data))
  console.log('result: ', result)

  const totalPages = users.total_pages
  const nextPage = page + 1
  if (totalPages > 1 && nextPage <= totalPages) {
    await fetchUsers(endPoint, nextPage)
  }

  return true
}

const page = 1
fetchUsers(endPoint, page)
  .then((result) => console.log('result: ', result))
  .catch((err) => console.error(err))
