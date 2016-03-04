function deleteBook(id, csrfToken) {

    var x = 1;

    $.ajax({
        url: '/admin/books/delete/' + id,
        type: 'DELETE',
        data: {
            "_csrf": csrfToken
        },
        success: function () {
            location.reload();
        }
    });

}

function deleteCategory(id, csrfToken) {

    var x = 1;
    
    $.ajax({
        url: '/admin/categories/delete/' + id,
        type: 'DELETE',
        data: {
            "_csrf": csrfToken
        },
        success: function () {
            location.reload();
        }
    });

}