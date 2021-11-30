USE [UXWEB]
GO

/****** Object:  Table [dbo].[UserTB]    Script Date: 2021-10-27 05:06:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserTB](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[BirthDate] [datetime] NULL,
	[InsertDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[Active] [bit] NULL,
	[PasswordHash] [nvarchar](max) NULL,
 CONSTRAINT [PK_UserTB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

