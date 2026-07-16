#File: app/api/v1/user_repository.py 

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User

class UserRepository:
    """
    User database operations.

    Responsibilities: 
    - Query users
    - Create users
    - Update users
    - Delete users
    - Password persistence

    Does NOT handle:
    - Authentication logic
    - Password hashing 
    - JWT tokens 
    - Business rules
    """

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        user_id: int,
    ) -> User | None:
        """
        Get user by primary key.
        """

        result = await db.execute(
            select(User)
            .where(User.id == user_id)
        )

        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_by_email(
        db: AsyncSession,
        email: str,
    ) -> User | None:
        """
        Get user by email address.
        """
        
        result = await db.execute(
            select(User)
            .where(
                User.email == email
            )
        )

        return result.scalar_one_or_none() 
    
    @staticmethod
    async def get_by_username(
        db: AsyncSession,
        usermame: str,
    ) -> User | None:
        """
        Get user by username.
        """

        result = await db.execute(
            select(User)
            .where(
                User.username == username
            )
        )
        return result.scalar_one_or_none()
    

    @staticmethod
    async def create(
        db: AsyncSession,
        user: User,
    ) -> User:
        """
        Crete new user.
        """

        db.add(user)

        await db.commit()
        
        await db.refresh(user)

        return user 
    
    @staticmethod
    async def update(
        db: AsyncSession,
        user: User,
    ) -> User:
        """
        Update existing user.
        """

        await db.commit()

        await db.refresh(user)

        return User 
    
    @staticmethod
    async def update_password(
        db: AsyncSession,
        user_id: int,
        password_hash: str,
    ):
        """
        Update user password hash.
        """

        await db.execute(
            update(User)
            .where(
                User.id == user_id
            )
            .values(
                password_hash=password_hash
            )
        )

        await db.commit() 

    @staticmethod 
    async def update_last_login(
        db: AsyncSession,
        user_id: int,
    ):
        """
        Update last login timestamp.
        """
        from datetime import datetime, timezone

        await db.execute(
            update(User)
            .where(
                User.id == user.id
            )
            .values(
                last_login=datetime.now(
                    timezone.utc 
                )
            )
        )

        await db.commit()

    @staticmethod
    async def activate_user(
        db: AsyncSession,
        user_id: int,
    ):
        """
        Active user account.
        """

        await db.execute(
            update(User)
            .where(
                User.id == user.id
            )
            .values(
                is_active=True
            )
        )

        await db.commit()

    @staticmethod
    async def deactivate_user(
        db: AsyncSession,
        user_id: int,
    ):
        """
        Disable user account.
        """

        await db.execute(
            update(User)
            .where(
                User.id == user_id 
            )
            .values(
                is_active=False
            )
        )

        await db.commit() 

    @staticmethod
    async def delete(
        db: AsyncSession,
        user_id: int,
    ): 
        """
        Delete user.
        """

        user = await UserRepository.get_by_id(
            db,
            user_id,
        )

        if user:
            await db.delete(user)
            await db.commit()

    @staticmethod
    async def exists_by_email(
        db: AsyncSession,
        email: str,
    ) -> bool:
        """
        Check email existence.
        """

        result = await db.execute(
            select(User.id)
            .where(
                User.email == email 
            )
        )

        return result.scalar_one_or_none() is not None 
    
    @staticmethod
    async def list_users(
        db: AsyncSession,
        skip: int = 0,
        limit: int = 20,
    ) -> list[User]:
        """
        Pagination query.
        """

        result = await db.execute(
            select(User)
            .offset(skip)
            .limit(limit)
        )

        return list(
            result.scalar().all()
        )