import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
const MongoDBStore = MongoDBSession(session);

const store = new MongoDBStore({
    uri: `${process.env.MONGODB_URI}`,
    collection: "session",
});
const sessionMiddleware = session({
    secret: `${process.env.SECRET_JWT}`,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    },
});

export default sessionMiddleware;
