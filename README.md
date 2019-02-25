# JT Book Finder

## Instructions

Create an application that allows you to use the Google Books API to search for books. You may need to signup with google to get a API key; read the documentation for more information.

This application should allow you to:
- Enter a query in a search box
- Display a list of books matching the given query.
- Each item in the list should include the book's author, title, and publishing company, as well as a picture of the book.
- From each list item, you should also be able to navigate to more information about the book, but this information does not necessarily need to appear on a page within your application. In other words, this could link out to an external site with more information about that particular book.

More details here: [친구 Handbook](https://chingu.gitbook.io/cohort/cohort-guide/pre-work)

## Pre-Project

Project Requirements: Create an application that allows you to use the Google Books API to
search for books

## To Do

- Read over the Google Books API Documentation
- Setup your parent component
- Create Search Input Element and Button
- Create a stateless book card component
- Make an API call to Google Books API And handle, loading, resolved, error conditions
- Iterate over the returned results, and pass in individual book data into your book card component
- Handle edge cases
- Add loading and error states after API call

## Webpack work

- Setup MiniCssExtractPlugin to extract CSS to a separate file.:j

## Bonus Considerations

- Make it mobile responsive
- Create a bookshelf for the users that stores bookmarked books.
- On search input, display the last 10 search queries

