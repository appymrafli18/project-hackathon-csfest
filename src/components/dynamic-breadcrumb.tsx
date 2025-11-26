import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { courseMap, jurusanMap, prodiMap } from "@/lib/breadcrumbMap";
import { Link } from "react-router-dom";

const DynamicBreadcrumb = () => {
    const segments = location.pathname.split("/").filter(Boolean)

    const buildPath = (index: number) =>
        "/" + segments.slice(0, index + 1).join("/")

    const formatSegment = (seg: string, index: number, segments: string[]) => {
        if (segments[0] === "enroll-course" && index === 1) {
            return jurusanMap[seg] ?? "Jurusan";
        }

        if (segments[0] === "enroll-course" && index === 2) {
            const jurusanId = segments[1];
            return prodiMap[jurusanId]?.[seg] ?? "Program Studi";
        }

        if (segments[0] === "my-course" && index === 1) {
            return courseMap[seg] ?? "Mata Kuliah";
        }

        if (segments[0] === "my-course" && index === 1) {
            return courseMap[seg] ?? "Mata Kuliah";
        }
                
        return seg
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {segments.map((seg, i) => {
                    const fullPath = buildPath(i);
                    const isLast = i === segments.length - 1;

                    const label = formatSegment(seg, i, segments);

                    return (
                        <div key={i} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={fullPath}>{label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}

            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default DynamicBreadcrumb