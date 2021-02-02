const express = require('express')
const router = express.Router()
const User =  require('../models/user')

// Getting All Users
router.get('/', async (req, res) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting User
router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
})

// Creating User
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		mobile: req.body.mobile,
		hobbies: req.body.hobbies,
		address: req.body.address
	})
	try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}

})

// Updating User
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name
	}
	if (req.body.mobile != null) {
		res.user.mobile = req.body.mobile
	}
	if (req.body.hobbies != null) {
		res.user.hobbies = req.body.hobbies
	}
	if (req.body.address != null) {
		res.user.address = req.body.address
	}

	try {
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Deleting User
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({ message: "User Deleted" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})


async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if(user == null) {
			return res.status(404).json({ message: "User Not Found" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}

	res.user = user
	next()
}

module.exports = router