import { Avatar, Badge  } from "@material-tailwind/react";


const UserIcon = () => {
    return (
        <Badge
            placement="top-end"
            overlap="circular"
            color="green"
            withBorder
        >
            <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="sm"
                className="rounded-full cursor-pointer"
            />
        </Badge>
    );
};

export default UserIcon;