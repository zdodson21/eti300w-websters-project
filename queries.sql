-- Create the table layout for this prototype
CREATE TABLE Data (
  BookName varchar(255),
  BookAuthor varchar(255),
  BookPrice Decimal(10,2),
  BookGenre varchar(255),
  CustomerName varchar(255),
  CustomerEmail varchar(255),
  CustomerPhone varchar(255)
);

-- http://localhost:3000/api/server?bookName=TreasureIsland&bookAuthor=Stevenson&bookPrice=10.99&bookGenre=fiction&customerName=Zach&customerEmail=zrd5048@psu.edu&customerPhone=1324567890

-- Delete data
DELETE FROM Data;