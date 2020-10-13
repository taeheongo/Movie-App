db.users.updateOne(
  {
    "cart._id": {
      $in:[
      ObjectId("5f839c92973884dda4c5354a"),
      ObjectId("5f839c92973884dda4c53549"),
      ObjectId("5f839c92973884dda4c53551"),
    ]},
  },
  {
    $pull: {
      cart:{
        _id: {
          $in:[
            ObjectId("5f839c92973884dda4c5354a"),
            ObjectId("5f839c92973884dda4c53549"),
            ObjectId("5f839c92973884dda4c53551"),
          ],
        }
      } 
    },
  }
);

,
  {
    $pullAll: {
      "cart.$._id": [
        ObjectId("5f839c92973884dda4c5354a"),
        ObjectId("5f839c92973884dda4c53549"),
        ObjectId("5f839c92973884dda4c53551"),
      ],
    },
  }