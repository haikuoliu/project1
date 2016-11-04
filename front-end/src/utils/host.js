let hostname // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  hostname = 'localhost'
} else {
  hostname = 'localhost'
}

export default hostname
