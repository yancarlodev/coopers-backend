import { app } from './app'
import 'dotenv/config'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}. Let's track ours tasks!`)
})