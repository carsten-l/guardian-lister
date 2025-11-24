import { type NewsItem } from "../types";
import { formatDate } from "../utils/formatDate";
import { Card, CardHeader, CardFooter } from "@fluentui/react-components";
import { Caption1, Caption2Strong, Title3 } from "@fluentui/react-components";

export default function NewsListItem({ item }: { item: NewsItem }) {
    return (
        <article>
            <Card size="large">
                <CardHeader
                    header={
                        <Caption2Strong className="uppercase">
                            {item.pillarName !== item.sectionName
                                ? `${item.pillarName} • ${item.sectionName}`
                                : item.sectionName}
                        </Caption2Strong>
                    }
                />
                <Title3 as="h2" className="text-balance text-lg">
                    {item.webTitle}
                </Title3>
                <CardFooter>
                    <Caption1 className="text-[colorNeutralForeground4]">
                        {formatDate(item.webPublicationDate)}
                    </Caption1>
                </CardFooter>
            </Card>
        </article>
    );
}
