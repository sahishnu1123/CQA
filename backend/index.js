const exp = require('express');
const {Pool} = require('pg');
const cors = require('cors');


const app = exp(); 

app.use(exp.json());
app.use(cors({

    origin: true,
    credentials:true
}));

const pool = new Pool({

    user:'postgres',
    host:'localhost',
    port:'5432',
    password:'1234',
    database:'cqadb'
});

app.get("/users", async (req, res)=>{

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select * from users')
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            //console.log(err.stack);
        }
    })
});


app.get("/home", async (req, res)=>{

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select post_id, display_name, title, body, posts.creation_date, posts.last_edit_date from posts, users where posts.owner_id = users.account_id order by posts.creation_date;')
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            //console.log(err.stack);
        }
    })
});

app.post("/myposts", async (req, res)=>{

    const user_id = req.body.user_id;

    //console.log(user_id);

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select post_id, display_name, title, body, posts.creation_date from posts, users where posts.owner_id = users.account_id and users.display_name = $1 order by posts.creation_date', [user_id])
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/userposts", async (req, res)=>{

    const user_id = req.body.user_id;

    //console.log(user_id);

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select post_id, display_name, title, body, posts.creation_date, posts.last_edit_date from posts, users where posts.owner_id = users.account_id and users.account_id = $1 order by posts.creation_date', [user_id])
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/tagposts", async (req, res)=>{

    const tag_name = req.body.tag_name;

    //console.log(user_id);

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select post_id, display_name, title, body, posts.creation_date, posts.last_edit_date, tag_name from users, tags inner join posts on tags.tag_id = any(posts.tags) where tag_name = $1 and users.account_id = posts.owner_id order by posts.creation_date;', [tag_name])
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/multipletagposts", async (req, res)=>{

    const tag_array = req.body.tagarray;
    //console.log(tag_array);

    //console.log(user_id);

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('WITH tag_ids AS (SELECT tag_id, tag_name FROM tags WHERE tag_name = ANY($1::text[]) ), post_tag_counts AS ( SELECT post_id, COUNT(DISTINCT post_tags.tag_id) AS tag_count FROM (SELECT post_id, UNNEST(tags) AS tag_id FROM posts WHERE ARRAY_LENGTH(tags, 1) > 0) post_tags JOIN tag_ids ON tag_ids.tag_id = post_tags.tag_id GROUP BY post_id ) SELECT p.* FROM post_tag_counts ptc JOIN posts p ON ptc.post_id = p.post_id WHERE ptc.tag_count = ARRAY_LENGTH($2::text[], 1) AND NOT EXISTS ( SELECT 1 FROM (select tag_id from tags where tag_name = any($3::text[])) t WHERE t.tag_id not in (SELECT unnest(p.tags)) order by p.creation_date);', [tag_array, tag_array, [tag_array]])
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/bio", async (req, res)=>{

    const user_id = req.body.user_id;

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select * from users where display_name = $1', [user_id])
                
            client.release();
            res.json(result.rows)
            //console.log("bio")
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.get("/votes", async (req, res)=>{

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select post_id, vote_type_id, count(vote_type_id) as count from votes group by post_id, vote_type_id')
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows);
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.get("/tags", async (req, res)=>{

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select distinct tag_name, post_id from tags inner join posts on tags.tag_id = any(posts.tags) order by post_id;')
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows);
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/comments", async (req, res)=>{

    const post_id = req.body.postId;

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select account_id as user_id, display_name, body, comments.creation_date from comments, users where comments.post_id = $1 and comments.user_id = users.account_id', [post_id])
                
            client.release();
            res.json(result.rows)
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});



app.post("/login", async (req, res)=>{

    //console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    await pool.connect().then(async (client)=>{

        try{

            pool.query("select count(*) from users where display_name = $1 and password = $2", [username, password], (err,result)=>{

                //console.log(result.rows);

                if(result.rows[0].count == 1){

                    res.send({validity: true});

                }

                else res.send({validity: false});
            });

        }
        catch(err){

            res.send(err);
            console.log(err.stack);
        }
    })
});

app.post("/signup", async (req, res)=>{

    //console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const aboutme = req.body.aboutme;
    const creation_date = new Date().toLocaleDateString();

    await pool.connect().then(async (client)=>{

        try{

            pool.query("select count(*) from users where display_name = $1", [username], (err,result)=>{


                if(result.rows[0].count == 0){

                    pool.query("insert into users (display_name, password, location, about_me, creation_date, last_access_date) values($1, $2, $3, $4, $5, $6)", [username, password, location, aboutme, creation_date, creation_date])

                    res.send({validity: true});

                }

                else res.send({validity: false});
            });

        }
        catch(err){

            res.send(err);
            console.log(err.stack);
        }
    })
});

app.post("/deletepost", async (req, res)=>{

    const post_id = req.body.post_id;

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('delete from posts where post_id = $1', [post_id])
                
            client.release();
            res.json(result.rows)
            //console.log("bio")
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/editpost", async (req, res)=>{

    const post_id = req.body.post_id; 
    const title = req.body.title;
    const tags = req.body.tags;
    const body = req.body.body;
    const update_date = new Date().toLocaleDateString();

    //console.log(tags.join(", "));

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query("select array_agg(tag_id) as tag_ids from (select tag_id from tags where tag_name = any($1)) as tag_id_subquery;", [tags])
                

            const result2 = await client
                .query('update posts set title = $1, tags = $2, body = $3, last_edit_date = $4 where post_id = $5', [title, result.rows[0].tag_ids, body, update_date, post_id])

                res.send(result2)
        }

        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/addpost", async (req, res)=>{

    const username = req.body.name;
    const title = req.body.title;
    const tags = req.body.tags.split(", ");
    const body = req.body.body;
    const creation_date = new Date().toLocaleDateString();

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select * from users where display_name = $1', [username])

                //console.log(result);

                const user_id = result.rows[0].account_id;

            const result1 = await client
                .query("select array_agg(tag_id) as tag_ids from (select tag_id from tags where tag_name = any($1)) as tag_id_subquery;", [tags])
                
            

            const result2 = await client
                .query('insert into posts (owner_id, last_editor_id, title, tags, body, creation_date, last_edit_date) values ($1, $2, $3, $4, $5, $6, $7)', [user_id, user_id, title, result1.rows[0].tag_ids,body, creation_date, creation_date])

            res.send(result2)
        }

        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});

app.post("/addcomment", async (req, res)=>{

    const body = req.body.body;
    const post_id = req.body.post_id;
    const username = req.body.username;
    const creation_date = new Date().toLocaleDateString();

    //console.log(username);

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query('select * from users where display_name = $1', [username])

                //console.log(result.rows);

                const user_id = result.rows[0].account_id;

            const result2 = await client
                .query('insert into comments(post_id, user_id, body, creation_date) values($1, $2, $3, $4)', [post_id, user_id, body, creation_date])

            const result3 = await client
                .query('update posts set comments_count = comments_count + 1 where post_id = $1',[post_id])

            res.json(result2)

        }
        catch(err){

            res.send(err);
            console.log(err.stack);
        }
    })
});

app.post("/upvotehandle", async (req, res)=>{

    const username = req.body.username
    // console.log(username);
    const post_id = req.body.post.post_id
    const creation_date = new Date().toLocaleDateString();

    await pool.connect().then(async (client)=>{

        try{

            let vote_type = -1;

            const result = await client
                .query('select * from users where display_name = $1', [username])

                //console.log(result.rows);

                const user_id = result.rows[0].account_id;

            const result2 = await client
                .query('select count(*), vote_type_id from votes where post_id = $1 and user_id = $2 group by vote_type_id;', [post_id, user_id])

            if(result2.rows.length === 0){

                vote_type = 1;

                await client .query('insert into votes (user_id, post_id, vote_type_id, creation_date) values($1, $2, $3, $4)', [user_id, post_id, vote_type, creation_date])
                
            }

            else{

                vote_type = result2.rows[0].vote_type_id;

                if(vote_type === 0){

                    await client .query("update votes set vote_type_id = '1' where post_id = $1 and user_id = $2",[post_id, user_id])

                }

                else{

                    await client .query("delete from votes where post_id = $1 and user_id = $2",[post_id, user_id])
                }
            }

        }
        catch(err){

            res.send(err);
            console.log(err.stack);
        }
    })
});

app.post("/downvotehandle", async (req, res)=>{

    const username = req.body.username
    const post_id = req.body.post.post_id
    const creation_date = new Date().toLocaleDateString();

    await pool.connect().then(async (client)=>{

        try{

            let vote_type = -1;

            const result = await client
                .query('select * from users where display_name = $1', [username])

                //console.log(result);

                const user_id = result.rows[0].account_id;

            const result2 = await client
                .query('select count(*), vote_type_id from votes where post_id = $1 and user_id = $2 group by vote_type_id;', [post_id, user_id])

            if(result2.rows.length === 0){

                vote_type = 0;

                await client .query('insert into votes (user_id, post_id, vote_type_id, creation_date) values($1, $2, $3, $4)', [user_id, post_id, vote_type, creation_date])
                
            }

            else{

                vote_type = result2.rows[0].vote_type_id;

                if(vote_type === 1){

                    await client .query("update votes set vote_type_id = '0' where post_id = $1 and user_id = $2",[post_id, user_id])

                }

                else{

                    await client .query("delete from votes where post_id = $1 and user_id = $2",[post_id, user_id])
                }
            }

        }
        catch(err){

            res.send(err);
            console.log(err.stack);
        }
    })
});

app.post("/autobyuserid", async (req, res)=>{

    const text = req.body.text;

    await pool.connect().then(async (client)=>{

        try{

            const result = await client
                .query("select * from users where display_name ilike $1", [`%${text}%`])
                
            client.release();
            res.json(result.rows)
            //console.log("bio")
            //console.log(result.rows)
        }
        catch(err){

            client.release();
            console.log(err.stack);
        }
    })
});



app.listen(5000, ()=>{

    console.log("server up!");
});