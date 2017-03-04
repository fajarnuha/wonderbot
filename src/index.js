const express = require('express')
const bodyParser = require('body-parser')
const apiai = require('./apiai')
const task = require('./task')

const app = express()

const PORT = 8080

app.use(bodyParser.json())

app.post('/', (req, res) => {
    const question = req.body.question

    //panggil apiai.js Question
    const requestApiAi = apiai.askQuestion(question)

    requestApiAi.then(resFromApiAi => resFromApiAi.json())
        .then(jsonFromApi => {
            const result = jsonFromApi.result

            switch(result.metadata.intentName) {
                case 'create.task': {
                    const taskName = result.parameters.text
                    task.create(taskName)
                    res.send(result.speech)
                    break
                }
                case 'show.task': {
                    const taskList = task.get()
                    res.send(taskList.join(", "))
                    break
                }
                case 'delete.task': {
                    const number = result.parameters.number
                    task.remove(number)
                    res.send(result.speech)
                    break
                }
                default:
                    res.send(result.speech)
            }
            //res.json(jsonFromApi)
        })
})

//run server on port VARIABLE PORT
app.listen(PORT, () => {
    console.log(`App run at 127.0.0.1:${PORT}`)
})
