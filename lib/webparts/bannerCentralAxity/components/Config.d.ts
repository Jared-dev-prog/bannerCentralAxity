import * as React from "react";
interface IMyWebPartConfigProps {
    properties: IMyWebPartProps;
    onApplyClick: () => void;
}
interface IMyWebPartProps {
    description: string;
    title: string;
}
declare const Config: React.FC<IMyWebPartConfigProps>;
export default Config;
//# sourceMappingURL=Config.d.ts.map