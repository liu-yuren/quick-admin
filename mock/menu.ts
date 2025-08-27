export default [
  {
    url: '/api/menu/list',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          { id: 1, name: 'John Doe', age: 25 },
          { id: 2, name: 'Jane Doe', age: 24 },
        ],
      }
    },
  },
]
