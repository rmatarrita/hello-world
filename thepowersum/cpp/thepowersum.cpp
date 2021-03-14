#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;

int powersumrec(int target, int index, int exponent);

int rootNofX(int X, int N)
{
    int result = 1;
    int top = sqrt(X) + 1;
    for (int i = 1; i <= top; i++)
    {
        if (pow(i, N) > X)
        {
            result = i;
            break;
        }
    }
    return result;
}

// builds all possible solutions from the simplest (terminal cases) to the full
// base recursion cases are converted into values initialized in the array
// the rest of the cells are built by referencing cells that have been previously solved
int powerSumDynamicProg(int X, int N)
{
    int **matrix;
    int sqrtYofX = rootNofX(X, N);

    matrix = new int *[sqrtYofX];
    for (int i = 0; i < sqrtYofX; i++)
    {
        matrix[i] = new int[X + 1];
        memset(matrix[i], 0, (X + 1) * sizeof(int));
        // initialize with default base case if X == 0 then 1
        matrix[i][0] = 1;
    }
    int index = 0;
    int power = 0;
    for (int i = sqrtYofX - 1; i >= 0; i--)
    {
        index = i + 1;
        if (index > 1)
        {
            double powResult = pow(index, N);
            power = (int)powResult;
        }
        else
        {
            power = 1;
        }
        for (int j = 1; j <= X; j++)
        {
            if ((index > j) || (power > j))
            {
                matrix[i][j] = 0;
            }
            else
            {
                // it should enter here only when i < sqrtX-1
                matrix[i][j] = matrix[i + 1][j - power] + matrix[i + 1][j];
            }
        }
    }
    int result = matrix[0][X];
    for (long i = 0; i < sqrtYofX; i++)
    {
        delete matrix[i];
    }
    delete matrix;
    return result;
}

int powersum(int target, int exponent)
{
    if (target == 0)
    {
        return 1;
    }
    else
    {
        //return powersumrec(target, 1, exponent);
        return powerSumDynamicProg(target, exponent);
    }
}

int powersumrec(int target, int index, int exponent)
{
    if (target == 0)
    {
        return 1;
    }
    if ((index > target) || (pow(index, exponent) > target))
    {
        return 0;
    }
    else
    {
        return powersumrec(target - (pow(index, exponent)), index + 1, exponent) +
               powersumrec(target, index + 1, exponent);
    }
}

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));

    ifstream idatafile("input.txt");
    if (idatafile.is_open())
    {
        string line;
        int X;
        getline(idatafile, line);
        X = stoi(line);
        int N;
        getline(idatafile, line);
        N = stoi(line);

        int result = powersum(X, N);

        std::cout << result << "\n";
        idatafile.close();
    }

    //fout.close();
}
