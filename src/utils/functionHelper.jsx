// since the React.lazy load suspense only supports component with export default //
// should bypass components with multiple exports here //
export { default as getContent } from '@utils/templateFunctions';
export { default as getComponent } from '@utils/templateMapping';
