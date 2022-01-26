const express = require('express')
const bcrypt = require('bcryptjs')
const fast2sms = require("fast-two-sms")
const router = express.Router()
const User = require("../model/User")
const deletedUser = require("../model/DeletedUser")
const validator = require("validator")

const authentication = require('../auth/authentication')

router.delete("/logout", authentication, async (req, res) => {
    const user = await User.findOne({ _id: req.userID })
    req.rootUser.tokens = []
    res.clearCookie("jwttoken", { path: "/" })
    await req.rootUser.save()
    res.status(201).send("Logout Succeessfully")
})


router.post("/register", async (req, res) => {
    try {
        const { name, address, email, phone, password } = req.body
        const acno = new Date().getTime().toString()
        if (!name || !address || !email || !phone || !password) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }

        else if (!validator.isEmail(email)) {
            return res.status(422).json({ err: "Enter a valid email" })
        }
        else {
            const userExist = await User.findOne({ $or: [{ email: email }] })
            if (userExist) {
                return res.status(422).json({ err: "Email already exists" })
            }
            else {
                const user = new User({ name, address, email, phone, password, acno })
                await user.save()
                return res.status(201).json({ msg: "Registered Successfully" })
            }
        }

    } catch (err) {
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password, type } = req.body
        if (!email || !password) {
            return res.status(400).json({ err: "plz fill the data" })
        }
        else {
            const userLogin = await User.findOne({ email: email })
            if ((userLogin && type === "Admin" && userLogin.email == process.env.admin)) {
                const isMatch = await bcrypt.compare(password, userLogin.password)
                if (!isMatch) {
                    return res.status(400).json({ err: "InValid credential" })
                }
                const token = await userLogin.generateToken();
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                return res.status(201).json({ msg: "login successfully", type: type })
            }
            else if ((userLogin && type === "User" && userLogin.email != process.env.admin)) {
                const isMatch = await bcrypt.compare(password, userLogin.password)
                if (!isMatch) {
                    return res.status(400).json({ err: "InValid credential" })
                }
                const token = await userLogin.generateToken();
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                return res.status(201).json({ msg: "login successfully", type: type })
            }
            else {
                return res.status(400).json({ err: "InValid credential" })
            }
        }
    }
    catch (err) {
        console.log("Error in login" + err)
    }
})

router.post("/data", authentication, async (req, res) => {
    try {
        if (req.rootUser.email == process.env.admin) {
            res.status(201).json({ user: req.rootUser, type: "Admin" })
        } else if (req.rootUser.email) {
            res.status(201).json({ user: req.rootUser, type: "User" })
        }
        else {
            res.status(404).json({ err: "No user logged in" })

        }
    }
    catch (err) {
        res.status(404).json({ err: "No user logged in" })
    }
})
router.post("/allUser", async (req, res) => {
    try {
        const consumer = await User.find({})
        res.status(201).send(consumer)
    }
    catch (err) {
        res.status(404).json({ err: "No user Found" })
    }
})

router.post("/addCons", authentication, async (req, res) => {
    try {
        const { name, acno, email, phone, cpassword, apassword } = req.body
        if (!name || !acno || !email || !phone || !cpassword || !apassword) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }

        else if (!validator.isEmail(email)) {
            return res.status(422).json({ err: "Enter a valid email" })
        }
        else {
            const adminVerify = await User.findOne({ _id: req.userID })
            const isMatch = await bcrypt.compare(apassword, adminVerify.password)
            if (isMatch) {
                const userExist = await User.findOne({ $or: [{ email }, { acno }] })
                if (userExist) {
                    return res.status(422).json({ err: "User already exists" })
                }
                const user = new User({ name, acno, email, phone, password: cpassword })
                await user.save()
                return res.status(201).json({ msg: "Added Successfully" })
            }
            else {
                return res.status(422).json({ err: "Invalid Credential of Admin" })
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})

router.delete("/deleteAccount", authentication, async (req, res) => {
    try {
        const { acno, email, password, message } = req.body
        if (!acno || !email || !password || !message) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }
        else if (!validator.isEmail(email)) {
            return res.status(422).json({ err: "Enter a valid email" })
        }
        else {
            const userVerify = await User.findOne({ _id: req.userID })
            const isMatch = await bcrypt.compare(password, userVerify.password)
            if (isMatch) {
                const userExist = await User.deleteOne({ acno, email })
                if (userExist.n > 0) {
                    const deleted = new deletedUser({ acno, email, message })
                    await deleted.save()
                    return res.status(201).json({ msg: "Deleted Successfully" })
                }
                return res.status(422).json({ err: "User Not exists" })
                // return res.status(201).json({ msg: "Added Successfully" })
            }
            else {
                return res.status(422).json({ err: "Invalid Credential " })
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})


router.patch("/updateUser", authentication, async (req, res) => {
    try {
        const { name, acno, email, phone, password, address } = req.body
        if (!acno || !email || !password || !name || !phone) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }

        else if (!validator.isEmail(email)) {
            return res.status(422).json({ err: "Enter a valid email" })
        }
        else {
            const userVerify = await User.findOne({ _id: req.userID })
            const isMatch = await bcrypt.compare(password, userVerify.password)
            if (isMatch) {
                const userExist = await User.findOne({ acno })

                if (userExist) {
                    const update = await User.findOneAndUpdate({ acno }, { $set: { name, email, phone, address } })

                    return res.status(201).json({ msg: "Updated Successfully" })
                }
                return res.status(422).json({ err: "User Not exists" })

            }
            else {
                return res.status(422).json({ err: "Invalid Credential " })
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})

router.patch("/publishBill", async (req, res) => {
    try {
        const { acno, amount, due } = req.body
        if (!acno || !amount || !due) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }

        else {
            const userExist = await User.findOne({ acno })
            if (userExist) {
                const prev = userExist?.bill.reverse()[0].unit
                const curr = (amount - prev) * 6;
                const update = await User.updateOne({ acno }, { $push: { bill: { amount: curr, due, unit: amount } } })
                return res.status(201).json({ msg: "Published Successfully" })
            }
            return res.status(422).json({ err: "User Not exists" })

        }

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})
router.patch("/payBill", authentication, async (req, res) => {
    try {
        const { status } = req.body
        const date = new Date() + ""
        const paidon = date.split("G", 1)[0]
        // console.log(paidon)
        const userVerify = await User.findOne({ _id: req.userID, "bill.status": "notpaid" })

        let count = 0
        userVerify?.bill?.map((val) => {
            if (val.status === 'notpaid') {
                count++;
            }
            return true
        })

        if (userVerify) {
            const extra = (count - 1) * 30
            if (count === 1) {
                const update = await User.findOneAndUpdate({ _id: req.userID, "bill.status": "notpaid" }, { $set: { "bill.$.status": status, "bill.$.date": paidon } })
            }
            else {
                for (let i = 1; i <= count; i++) {
                    if (i < count) {
                        const update = await User.findOneAndUpdate({ _id: req.userID, "bill.status": "notpaid" }, { $set: { "bill.$.status": status, "bill.$.date": paidon } })
                    }
                    else {
                        const update = await User.findOneAndUpdate({ _id: req.userID, "bill.status": "notpaid" }, { $set: { "bill.$.status": status, "bill.$.date": paidon, "bill.$.extra": extra } })
                    }
                }
            }

            return res.status(201).json({ msg: "Payment Done Successfully" })
        }
        else {
            return res.status(422).json({ err: "Already Paid the bills" })

        }
        // return res.status(201).json({ msg: "Payment Done Successfully" })
    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "Payment failed" })
    }
})

router.patch("/messageConsumer", authentication, async (req, res) => {
    try {
        const { acno, email, message, password, type } = req.body
        const date = new Date() + ""
        const paidon = date.split("G", 1)[0]
        if (!acno || !email || !message || !password) {
            return res.status(422).json({ err: "PLz fill all the field properties " })
        }

        else {
            const userVerify = await User.findOne({ _id: req.userID })
            const isMatch = await bcrypt.compare(password, userVerify.password)
            if (isMatch) {
                const userExist = await User.findOne({ $and: [{ acno }, { email }] })
                if (userExist && type == "admin") {
                    const update = await User.updateOne({ acno }, { $push: { messages: { message, date: paidon } } })
                    return res.status(201).json({ msg: "Message Send Successfully" })
                }
                else if (userExist && type == "user") {
                    const update = await User.updateOne({ email: process.env.admin }, { $push: { messages: { message, email, acno, date: paidon } } })
                    return res.status(201).json({ msg: "Message Send Successfully" })
                }
                console.log(type)
                return res.status(422).json({ err: "User Not exists" })
            } else {
                return res.status(422).json({ err: "Invalid Credential " })
            }

        }

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill all data correclty" })
    }
})
router.patch("/paymentSms", authentication, async (req, res) => {
    try {
        // console.log(sms)
        const { message } = req.body
        const date = new Date() + ""
        const paidon = date.split("G", 1)[0]
        const userVerify = await User.findOne({ _id: req.userID })
        const updateInAdmin = await User.updateOne({ email: process.env.admin }, { $push: { messages: { message: "Hello Sir, Payment Done", email: userVerify.email, acno: userVerify.acno } } })
        const updateinUser = await User.updateOne({ acno: userVerify.acno }, { $push: { messages: { message, date: paidon } } })
        // console.log(userVerify)


        const demo = await User.findOne({ _id: req.userID })
        // console.log(demo?.bill?.reverse()[0].extra)
        const extrabills = demo?.bill?.reverse()[0].extra
        let paidbill = 0
        const latemonth = extrabills / 30
        if (latemonth <= 0) {
            paidbill = demo?.bill?.reverse()[0].amount
            // console.log(paidbill)
        }
        else {
            const recentbill = demo?.bill
            for (let i = 0; i <= latemonth; i++) {
                paidbill += (+recentbill[i].amount)
            }
            paidbill += (+extrabills)
            // console.log(paidbill)
        }

        const sms=await fast2sms.sendMessage({authorization:process.env.API,message:`${paidbill} payment recieved (from electConsDB)`,numbers:[9082934394]})
        return res.status(201).json({ msg: "Notification Send Successfully" })

    } catch (err) {
        console.log(err)
        return res.status(422).json({ err: "plz fill data correclty" })
    }
})

module.exports = router
