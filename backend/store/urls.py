from django.urls import path
from . import views

urlpatterns = [

    # Products
    path("products/", views.get_products),
    path("products/<int:pk>/", views.get_product),

    path("products/search/", views.search_products),
    path("products/filter/", views.filter_products),

    # Categories
    path("categories/", views.get_categories),

    # Reviews
    path("reviews/<int:pk>/", views.get_reviews),
    path("reviews/add/", views.add_review),

    # Address
    path("addresses/", views.get_addresses),
    path("addresses/add/", views.add_address),
    path("addresses/<int:pk>/update/", views.update_address),
    path("addresses/<int:pk>/delete/", views.delete_address),

    # Auth
    path("register/", views.register_user),
    path("login/", views.login_user),
]