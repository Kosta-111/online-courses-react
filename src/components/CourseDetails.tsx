import { LeftOutlined } from '@ant-design/icons'
import { Button, Tag, Flex, Space, Skeleton, Image } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CourseModel } from '../models/courses';
import { tokenService } from '../services/token.service';

const api = import.meta.env.VITE_COURSES_API;
const host = import.meta.env.VITE_HOST;

type QueryParams = {
    id: string;
}

export default function CourseDetails() {

    const [item, setItem] = useState<CourseModel | null>(null);
    const { id } = useParams<QueryParams>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api + id, { headers: {
            Authorization: `Bearer ${tokenService.get()}`
        }})
          .then(res => res.json())
          .then(data => setItem(data));
    });

    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}>Back</Button>
            {item ?
                <div>
                    <h2>{item.name}</h2>
                    <p>{item.categoryName} ({item.levelName})</p>
                    <hr />
                    <Image width={200} src={item.imageUrl?.startsWith('https://') || item.imageUrl?.startsWith('http://') || !item.imageUrl
                                            ? item.imageUrl 
                                            : `${host}/${item.imageUrl}`} 
                                            alt={item.name} />
                    <p>Language: {item.language}</p>
                    <p>Price: {item.price}$</p>
                    <p>Discount: {item.discount}%</p>
                    <p>Rating: {item.rating}</p>
                    <p>Certificate: {item.isCertificate
                        ? <Tag color="green">Yes</Tag>
                        : <Tag color="red">No</Tag>}
                    </p>
                    <p>Description: {item.description}</p>
                </div>
                :
                <Flex gap="middle" vertical>
                    <Space>
                        <Skeleton.Input active />
                        <Skeleton.Input active />
                    </Space>
                    <Skeleton paragraph={{rows: 0,}} />
                    <Skeleton.Image />
                    <Skeleton active />
                </Flex>
            }
        </>
    )
}