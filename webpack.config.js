// WEBPACK DEVELOPMENT CONFIG
// =============================================================================

"use strict";

const path = require( "path" );
const webpack = require( "webpack" );

module.exports =
  { devtool: "eval"
  , entry:
    [ "webpack-hot-middleware/client"
    , path.resolve( "./src/scripts/client" )
    ]
  , output:
    { path: path.resolve( "./dist" )
    , filename: "bundle.js"
    , publicPath: "/static/"
    }
  , plugins:
    [ new webpack.HotModuleReplacementPlugin()
    , new webpack.NoErrorsPlugin()
    , new webpack.DefinePlugin(
        { "process.env":
          { BROWSER: JSON.stringify( true )
          , NODE_ENV: JSON.stringify( "development" )
          }
        }
      )
    ]
  , module:
    { loaders:
      // SCRIPTS
      [ { test: /\.(js|jsx)$/
        , loader: "babel"
        , exclude: /node_modules/
        , query:
          { cacheDirectory: true
          , "presets": [ "es2015", "stage-0", "react" ]
          , plugins:
            [ [ "transform-async-to-generator" ]
            , [ "transform-object-rest-spread" ]
            , [ "transform-class-properties" ]
            , [ "react-transform"
              , { transforms:
                  [ { transform: "react-transform-hmr"
                    , imports: [ "react" ]
                    , locals: [ "module" ]
                    }
                  ]
                }
              ]
            ]
          }
        , include: path.resolve( "./src/scripts" )
        }
      // STYLESHEETS
      , { test: /\.(css|scss)$/
        , loaders: [ "style?sourceMap", "css?sourceMap", "sass?sourceMap" ]
        , include:
          [ path.resolve( "./src/styles" )
          , path.resolve( "./src/scripts" )
          ]
        }
      // FONTS AND IMAGES
      , { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg)/
        , loader: "url"
        , query:
            { limit : 5000
            , name  : "[name].[ext]"
            }
        , include:
          [ path.resolve( "./src/fonts" )
          , path.resolve( "./src/images" )
          ]
        }
      ]
    }
  };
