var books = [];
    var bookIdCounter = 1;

    var addBookBtn = document.getElementById('addBookBtn');
    var bookModal = document.getElementById('bookModal');
    var bookForm = document.getElementById('bookForm');
    var booksGrid = document.getElementById('booksGrid');
    var emptyState = document.getElementById('emptyState');

    addBookBtn.addEventListener('click', function () {
      bookModal.style.display = 'block';
    });

    bookModal.addEventListener('click', function (e) {
      if (e.target === bookModal) {
        bookModal.style.display = 'none';
      }
    });

    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var title = document.getElementById('bookTitle').value;
      var author = document.getElementById('bookAuthor').value;
      var pages = document.getElementById('bookPages').value;
      var isRead = document.getElementById('bookRead').checked;

      var newBook = {
        id: bookIdCounter++,
        title: title,
        author: author,
        pages: pages,
        isRead: isRead
      };

      books.push(newBook);
      renderBooks();
      bookModal.style.display = 'none';
      bookForm.reset();
    });

    function renderBooks() {
      booksGrid.innerHTML = '';

      if (books.length === 0) {
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';

      for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
      }
    }

    function createBookCard(book) {
      var card = document.createElement('div');
      card.className = 'book-card';

      var readButtonClass = book.isRead ? 'btn-read' : 'btn-not-read';
      var readButtonText = book.isRead ? 'Read' : 'Not read';

      card.innerHTML =
        '<div class="book-title">"' + book.title + '"</div>' +
        '<div class="book-author">' + book.author + '</div>' +
        '<div class="book-pages">~' + book.pages + ' pages</div>' +
        '<div class="book-actions">' +
        '<button class="btn ' + readButtonClass + '" onclick="toggleReadStatus(' + book.id + ')">' + readButtonText + '</button>' +
        '<button class="btn btn-remove" onclick="removeBook(' + book.id + ')">Remove</button>' +
        '</div>';

      return card;
    }

    function toggleReadStatus(bookId) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
          books[i].isRead = !books[i].isRead;
          break;
        }
      }
      renderBooks();
    }

    function removeBook(bookId) {
      books = books.filter(function (book) {
        return book.id !== bookId;
      });
      renderBooks();
    }
    renderBooks();