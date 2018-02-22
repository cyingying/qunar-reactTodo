module.exports = {
    entry:"./src/js/index.js",
    output:{
        path:__dirname + "/qunar.reactTodo",   
        filename:"index.js",
        publicPath:"./qunar.reactTodo/"
    },
    module:{
        loaders:[
            {test:/.js$/,loader:'babel-loader',exclude:/node_modules/,query:{presets:['react','es2015']}},
            {test:/.css$/,loader:'style-loader!css-loader'},
            {test:/.(jpg|png|gif)$/,loader:'url-loader?limit=8192'}
        ]
    }
}