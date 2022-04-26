const items = [
  {
    name: 'Posterprocess 2021 Autumn Season',
    description: 'Production of Poster Copy',
    jobType: '',
    dueDate: '1 day ago',
    jobState: 'Review'
  },
  {
    name: 'Posterprocess 2021 Autumn Special',
    description: 'Production of Posters for the XMas Part',
    jobType: '',
    dueDate: 'in 2 day',
    jobState: 'Done',
    children: [
      {
        name: 'Posterprocess 2021 for special coloured',
        description: '-',
        jobType: '',
        dueDate: 'in 2 day',
        jobState: 'Review',
        children: [
          {
            name: 'Flyerprocess 2021 XM',
            description: 'Production of Flyers',
            jobType: '',
            dueDate: 'in 5 days',
            jobState: 'Done'
          },
          {
            name: 'Posterprocess 2021 Autumn Special',
            description: 'Production of Posters for the XMas Part',
            jobType: '',
            dueDate: 'in 2 day',
            jobState: 'Done',
            children: [
              {
                name: 'Flyerprocess 2021 XM',
                description: 'Production of Flyers',
                jobType: '',
                dueDate: 'in 5 days',
                jobState: 'Done'
              },
              {
                name: 'Posterprocess 2021 Autumn Special',
                description: 'Production of Posters for the XMas Part',
                jobType: '',
                dueDate: 'in 2 day',
                jobState: 'Done'
              }
            ]
          }
        ]
      },
      {
        name: 'Posterprocess 2021 for special coloured',
        description: '-',
        jobType: '',
        dueDate: 'in 2 day',
        jobState: 'Review'
      }
    ]
  }
]

const generateBigArray = n => {
  let arr = [...items]
  for (let i = 0; i < n; i++) {
    arr = [...arr, ...items]
  }
  return arr
}

function assignIds(data = [], parentId = null) {
  return data.map((item, index) => {
    const currentIndex = !Boolean(parentId) ? String(index + 1) : `${parentId}-${index + 1}`
    if (!item.children) {
      return { data: { ...item }, key: currentIndex }
    }
    const { name, description, jobType, dueDate, jobState } = item
    return {
      data: { name, description, jobType, dueDate, jobState },
      key: currentIndex,
      children: assignIds(item.children, currentIndex)
    }
  })
}

export const fakeTreeData = assignIds(generateBigArray(499))
