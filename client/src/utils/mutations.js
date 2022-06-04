import { gql } from '@apollo/client';
 
export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`
export const DELETE_BOOK = gql`
mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`
export const SAVE_BOOK = gql`
mutation SaveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
` 
export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email) {
    token
    user {
      _id
      username
      email
      password
    }
  }
}
`
