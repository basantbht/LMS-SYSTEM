import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;
    const isLoading = false;
    const navigate= useNavigate();

    const createLectureHandler = async () => {
        
    }

    return (
        <div className="flex-1 mx-10">
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                    Lets add lectures, add some basic details for your new lecture
                </h1>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
                    explicabo.
                </p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Your Title Name"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4animate-spin" />
                                </>
                            ) : "Create lecture"
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateLecture