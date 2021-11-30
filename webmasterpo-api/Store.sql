USE [UXWEB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SYSTEM_LOGIN]    Script Date: 2021-10-27 05:06:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_SYSTEM_LOGIN](
	@TYPE		nvarchar(50) = NULL,
	@UNAME		nvarchar(20) = NULL,
	@FNAME		nvarchar(50) = NULL,
	@LNAME		nvarchar(50) = NULL,
	@EMAIL		nvarchar(100) = NULL,
	@BIRTHDATE	datetime = NULL,
	@PASSWORD	nvarchar(max) = NULL,
	@ID			int = NULL
)
as

IF		@TYPE = 'GET_USER_ALL'		goto GET_USER_ALL
ELSE IF @TYPE = 'GET_USER_ONE'		goto GET_USER_ONE
ELSE IF @TYPE = 'ADD_USER'			goto ADD_USER
ELSE IF @TYPE = 'GET_USER_ID'		goto GET_USER_ID
ELSE IF @TYPE = 'EDIT_USER'			goto EDIT_USER
ELSE IF @TYPE = 'DELETE_USER'		goto DELETE_USER
ELSE RETURN

GET_USER_ALL:
	select*From UXWEB..UserTB
RETURN

GET_USER_ONE:
	select*From UXWEB..UserTB where Username = @UNAME
RETURN

ADD_USER:
	insert into UXWEB..UserTB(Username, FirstName, LastName, Email, BirthDate, InsertDate, Active, PasswordHash)
	values (@UNAME, @FNAME, @LNAME, @EMAIL, @BIRTHDATE, GETDATE(), 1, @PASSWORD)
RETURN

GET_USER_ID:
	select*From UXWEB..UserTB where Id = @ID
RETURN

EDIT_USER:
	update UXWEB..UserTB 
	set Username = @UNAME
		,FirstName = @FNAME
		,LastName = @LNAME
		,Email = @EMAIL
		,BirthDate = @BIRTHDATE
		,ModifyDate = GETDATE()
		,PasswordHash = @PASSWORD
	where Id = @ID

RETURN

DELETE_USER:
	delete From UXWEB..UserTB where Id = @ID
RETURN
GO

