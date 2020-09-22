import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    me: User!
    getMovie(name: String!): fetchResult!
    getMovies: fetchResult!
    getMoviesByGenre(genre: String): fetchResult!
    getMoviesByYear(yearFrom: Int!, yearTo: Int): fetchResult!
  }
  # <genre>

  #   1: 드라마 2: 판타지
  # 3: 서부 4: 공포
  # 5: 로맨스 6: 모험
  # 7: 스릴러 8: 느와르
  # 9: 컬트 10: 다큐멘터리
  # 11: 코미디 12: 가족
  # 13: 미스터리 14: 전쟁
  # 15: 애니메이션 16: 범죄
  # 17: 뮤지컬 18: SF
  # 19: 액션20: 무협
  # 21: 에로 22: 서스펜스
  # 23: 서사 24: 블랙코미디
  # 25: 실험 26: 영화카툰
  # 27: 영화음악 28: 영화패러디포스터
  type User {
    _id: String!
    username: String!
    email: String!
    movies: [Movie]!
    role: Int!
    token: String
    tokenExp: Int
  }

  type Movie {
    title: String!
    subtitle: String!
    link: String!
    userRating: Float!
    director: String!
    actor: [String]!
    pubDate: String!
    _id: String
  }

  type fetchResult {
    total: Int
    start: Int
    display: Int
    hasMore: Boolean
    movies: [Movie]
  }

  type AuthResult {
    success: Boolean!
    message: String
    user: User
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): AuthResult!
  }
`;

export default typeDefs;
