const { response } = require('express')
const mongoose = require('mongoose')
const Student = mongoose.model('Aluno')
const { schema, schemaUpdate } = require('../schemas')

module.exports = {

    async list(req, res) {
        console.log("\nlisting students ...")
        try {
            const students = await Student.find()
            res.status(200)
            return res.json(students)
        }
        catch {
            res.status(404)
            res.send('None shall pass')
        }
    },

    async get(req, res) {
        console.log("\ngetting student ...")
        try {
            const student = await Student.findById(req.params.id)
            res.status(200)
            console.log(req.params.id)
            return res.json(student)
        }
        catch {
            res.status(404);
            res.send('None shall pass');
        }
    },

    async post(req, res) {
        console.log("\ncreating student ...")

        let { error } = await schema.validate(req.body)
        if (error) return res.status(302).send(error.details)

        try {
            const student = await Student.create(req.body)
            res.status(200)
            console.log(req.body)
            return res.json(student)
        } catch {
            res.status(302)
            res.send('None shall pass')
        }
    },

    async put(req, res) {
        console.log("\nupdating student ...")

        let { error } = await schemaUpdate.validate(req.body)
        if (error) return res.status(400).send(error.details)

        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200);
            console.log(req.params.id)
            console.log(req.body)
            return res.json(student)
        }
        catch {
            res.status(404);
            res.send('None shall pass');
        }
    },

    async patch(req, res) {
        console.log("\npartially updating student ...")

        let { error } = await schemaUpdate.validate(req.body)
        if (error) return res.status(400).send(error.details)

        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200)
            console.log(req.params.id)
            console.log(req.body)
            return res.json(student)
        }
        catch {
            res.status(404);
            res.send('None shall pass');
        }
    },

    async delete(req, res) {
        console.log("\ndeleting student ...")

        try {
            await Student.findByIdAndRemove(req.params.id)
            res.status(200)
            console.log(req.params.id)
            return res.send()
        }
        catch {
            res.status(404);
            res.send('None shall pass');
        }
    }
}