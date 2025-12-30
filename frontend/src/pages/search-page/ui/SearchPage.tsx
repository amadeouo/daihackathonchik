import classes from './SearchPage.module.css'
import { Search } from "@/modules/search/ui";
import { useUsers } from "@/shared/hooks/useUsers.ts";

export const SearchPage = () => {
  const { users, loading, getUsers} = useUsers()

  return (
    <div className={classes.wrapper}>
      <Search
        onFilter={getUsers}
        placeholder="Поиск"
      />
      <div className={classes.usersWrapper}>
        <div className={classes.Photo}>
        </div>
      </div>
    </div>
  )
}