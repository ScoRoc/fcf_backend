const checkboxes = () => {
  const values = {
    community: {
      name: 'Community',
      type: 'community'
    },
    competition: {
      name: 'Competition',
      type: 'competition'
    },
    social: {
      name: 'Social',
      type: 'social'
    },
  }
  return {
    allCheckboxes: (() => values)(),
  }
}

export default checkboxes;
