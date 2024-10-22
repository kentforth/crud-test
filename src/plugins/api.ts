import { api } from "../services/api";

export default {
  install: (app) => {
   app.provide('$api', api)
  },
}
