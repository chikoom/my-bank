export const formatDate = unformatedDate => {
  const dateObject = new Date(unformatedDate)
  return `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`
}
