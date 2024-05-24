import dayjs from "dayjs";

function Film({
  id,
  title,
  favorite = false,
  watchDate = null,
  rating = 0,
  userId = 1,
}) {
  this.id = id;
  this.title = title;
  this.favorite = favorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate;
  this.userId = userId;
}

export { Film };
