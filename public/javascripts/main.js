$(document).ready(function(){
    $('.removeBook').click(function(e){
        deleteId = $(this).data('id');
        $.ajax({
            url: '/admin/books/delete/' + deleteId,
            type: 'DELETE',
            success: function(){

            }
        });
        window.location = '/admin/books';
    });
    $('.removeCategory').click(function(e){
        deleteId = $(this).data('id');
        $.ajax({
            url: '/admin/categories/delete/' + deleteId,
            type: 'DELETE',
            success: function(){

            }
        });
        window.location = '/admin/categories';
    });
});