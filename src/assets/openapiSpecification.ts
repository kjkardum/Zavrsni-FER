export default {
  "openapi": "3.0.1",
  "info": {
    "title": "Kjkardum.DummyRest.Api",
    "version": "1.0"
  },
  "paths": {
    "/api/Account/login": {
      "post": {
        "tags": [
          "Account"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LoginDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Articles": {
      "get": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "PageNumber",
            "in": "query",
            "style": "form",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "PageSize",
            "in": "query",
            "style": "form",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDtoPaginatedResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDtoPaginatedResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDtoPaginatedResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Articles"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}": {
      "get": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Articles/{id}/price": {
      "patch": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticlePriceInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticlePriceInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticlePriceInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}/info": {
      "patch": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInfoInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInfoInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleInfoInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}/toggleActive": {
      "patch": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}/images": {
      "get": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ArticleImageDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ArticleImageDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ArticleImageDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}/images/{imageId}/order": {
      "patch": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "imageId",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageOrderInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageOrderInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ArticleImageOrderInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArticleImageDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Articles/{id}/images/{imageId}": {
      "delete": {
        "tags": [
          "Articles"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "imageId",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/StringMaps": {
      "get": {
        "tags": [
          "StringMaps"
        ],
        "parameters": [
          {
            "name": "PageNumber",
            "in": "query",
            "style": "form",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "PageSize",
            "in": "query",
            "style": "form",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDtoPaginatedResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDtoPaginatedResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDtoPaginatedResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "StringMaps"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/StringMaps/{id}": {
      "get": {
        "tags": [
          "StringMaps"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "StringMaps"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapUpdateDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapUpdateDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/StringMapUpdateDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/StringMapDto"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "StringMaps"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users": {
      "get": {
        "tags": [
          "Users"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              }
            }
          }
        }
      }
    },
    "/api/Users/{id}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/api/Users/{id}/password": {
      "patch": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserPasswordInputDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserPasswordInputDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserPasswordInputDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "ArticleDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "active": {
            "type": "boolean",
            "description": "Is active?",
            "example": true
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "$ref": "#/components/schemas/ArticleType"
          },
          "images": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ArticleImageDto"
            },
            "nullable": true
          },
          "articleTags": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ArticleTagDto"
            },
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ArticleDtoPaginatedResponse": {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ArticleDto"
            },
            "nullable": true
          },
          "count": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "ArticleImageDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "order": {
            "type": "integer",
            "format": "int32"
          },
          "url": {
            "type": "string",
            "nullable": true
          },
          "altText": {
            "type": "string",
            "nullable": true
          },
          "articleId": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "ArticleImageInputDto": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "nullable": true
          },
          "altText": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ArticleImageOrderInputDto": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "ArticleInfoInputDto": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ArticleInputDto": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double"
          },
          "active": {
            "type": "boolean"
          },
          "categoryId": {
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "$ref": "#/components/schemas/ArticleType"
          }
        },
        "additionalProperties": false
      },
      "ArticlePriceInputDto": {
        "type": "object",
        "properties": {
          "price": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "ArticleTagDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "articleId": {
            "type": "string",
            "format": "uuid"
          },
          "tagValueId": {
            "type": "string",
            "format": "uuid"
          },
          "tagValue": {
            "$ref": "#/components/schemas/StringMapDto"
          }
        },
        "additionalProperties": false
      },
      "ArticleType": {
        "enum": [
          1,
          2,
          3,
          4
        ],
        "type": "integer",
        "description": "Article type",
        "format": "int32"
      },
      "LoginDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "nullable": true
          },
          "password": {
            "minLength": 8,
            "type": "string",
            "format": "password",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "StringMapDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "stringMapType": {
            "type": "string",
            "nullable": true
          },
          "value": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "StringMapDtoPaginatedResponse": {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/StringMapDto"
            },
            "nullable": true
          },
          "count": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "StringMapUpdateDto": {
        "type": "object",
        "properties": {
          "value": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "roleId": {
            "type": "string",
            "format": "uuid"
          },
          "role": {
            "$ref": "#/components/schemas/StringMapDto"
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "organization": {
            "$ref": "#/components/schemas/StringMapDto"
          }
        },
        "additionalProperties": false
      },
      "UserInputDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "firstName": {
            "type": "string",
            "nullable": true
          },
          "lastName": {
            "type": "string",
            "nullable": true
          },
          "roleId": {
            "type": "string",
            "format": "uuid"
          },
          "role": {
            "$ref": "#/components/schemas/StringMapDto"
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "organization": {
            "$ref": "#/components/schemas/StringMapDto"
          }
        },
        "additionalProperties": false
      },
      "UserPasswordInputDto": {
        "type": "object",
        "properties": {
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "apiKey",
        "description": "JWT Authorization token using the Bearer scheme. <br>\n                      Enter 'Bearer' [space] and then your token in the text input below. <br>\n                      Example: 'Bearer 12345abcdef'",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "Bearer": []
    }
  ]
}