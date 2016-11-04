let hostname // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  hostname = () => window.location.host
} else {
  hostname = () => 'localhost:8080'
}

export default hostname
